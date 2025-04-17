// scripts/generateI18nTypes.ts
import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const OUTPUT_FILE = path.join(process.cwd(), 'src/i18n/types.ts');
const BASE_LOCALE = 'en';

/**
 * Generate TypeScript interface from translation objects
 */
function generateTypeDefinition(obj: any, indent = 0): string {
  const indentStr = ' '.repeat(indent);
  let result = '{\n';

  Object.entries(obj).forEach(([key, value]) => {
    result += `${indentStr}  ${key}: `;

    if (typeof value === 'object' && value !== null) {
      result += generateTypeDefinition(value, indent + 2);
    } else {
      result += 'string';
    }

    result += ';\n';
  });

  result += `${indentStr}}`;
  return result;
}

/**
 * Validate translations against base locale
 */
function validateTranslations() {
  const locales = fs
    .readdirSync(MESSAGES_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));

  console.log(`\n📊 Translation validation report:`);

  try {
    const baseMessages = JSON.parse(
      fs.readFileSync(path.join(MESSAGES_DIR, `${BASE_LOCALE}.json`), 'utf8')
    );

    function flattenObject(obj: any, prefix = ''): Record<string, any> {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? `${prefix}.` : '';
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
        } else {
          acc[`${pre}${k}`] = obj[k];
        }
        return acc;
      }, {} as Record<string, any>);
    }

    const baseFlat = flattenObject(baseMessages);
    const baseKeys = Object.keys(baseFlat);
    console.log(
      `🔑 Base locale (${BASE_LOCALE}) has ${baseKeys.length} translation keys`
    );

    locales.forEach((locale) => {
      if (locale === BASE_LOCALE) return;

      try {
        const messages = JSON.parse(
          fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8')
        );
        const flat = flattenObject(messages);
        const keys = Object.keys(flat);

        const missingKeys = baseKeys.filter((key) => !keys.includes(key));
        const extraKeys = keys.filter((key) => !baseKeys.includes(key));

        console.log(`\n🌐 Locale: ${locale}`);
        console.log(`✓ Total keys: ${keys.length}`);

        if (missingKeys.length > 0) {
          console.log(`❌ Missing ${missingKeys.length} keys:`);
          missingKeys.forEach((key) => console.log(`  - ${key}`));
        } else {
          console.log(`✅ No missing keys`);
        }

        if (extraKeys.length > 0) {
          console.log(`⚠️ Extra ${extraKeys.length} keys:`);
          extraKeys.forEach((key) => console.log(`  - ${key}`));
        } else {
          console.log(`✅ No extra keys`);
        }
      } catch (error) {
        console.error(`Error processing locale ${locale}:`, error);
      }
    });
  } catch (error) {
    console.error(`Error reading base locale: ${error}`);
  }
}

function generateTypes() {
  try {
    console.log(`🔍 Reading messages from ${MESSAGES_DIR}`);

    // Check if messages directory exists
    if (!fs.existsSync(MESSAGES_DIR)) {
      console.error(`❌ Messages directory not found: ${MESSAGES_DIR}`);
      process.exit(1);
    }

    // Read the base locale file
    const baseLocaleFile = path.join(MESSAGES_DIR, `${BASE_LOCALE}.json`);
    if (!fs.existsSync(baseLocaleFile)) {
      console.error(`❌ Base locale file not found: ${baseLocaleFile}`);
      process.exit(1);
    }

    const baseMessages = JSON.parse(fs.readFileSync(baseLocaleFile, 'utf8'));

    // Generate the type definition
    const typeDefinition = `// Auto-generated from messages/${BASE_LOCALE}.json
// Generated on ${new Date().toISOString()}
// DO NOT EDIT MANUALLY

export type Messages = ${generateTypeDefinition(baseMessages)}`;

    // Create directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the type definition file
    fs.writeFileSync(OUTPUT_FILE, typeDefinition);
    console.log(`✅ Successfully generated types at: ${OUTPUT_FILE}`);

    // Run validation
    validateTranslations();
  } catch (error) {
    console.error(`❌ Error generating types: ${error}`);
    process.exit(1);
  }
}

// Run the script
generateTypes();
