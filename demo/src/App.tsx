import { useState } from 'react';
import { FileCarousel, type FileData } from 'react-file-carousel';

const sampleFiles: FileData[] = [
  {
    id: 'csv-1',
    name: 'users.csv',
    type: 'csv',
    content: `name,email,age,city
Alice Johnson,alice@example.com,30,New York
Bob Smith,bob@example.com,25,San Francisco
Charlie Brown,charlie@example.com,35,Chicago
Diana Prince,diana@example.com,28,Metropolis
Eve Torres,eve@example.com,32,Austin`,
  },
  {
    id: 'json-1',
    name: 'config.json',
    type: 'json',
    content: JSON.stringify(
      {
        appName: 'MyApp',
        version: '2.1.0',
        debug: false,
        database: {
          host: 'localhost',
          port: 5432,
          name: 'myapp_db',
        },
        features: ['auth', 'notifications', 'analytics'],
      },
      null,
      2
    ),
  },
  {
    id: 'text-1',
    name: 'notes.txt',
    type: 'text',
    content: `Meeting Notes - Feb 2026
========================

Attendees: Alice, Bob, Charlie

Action Items:
- [ ] Finalize API design by Friday
- [ ] Review pull request #42
- [ ] Update deployment docs

Next meeting: Monday 10am`,
  },
  {
    id: 'json-2',
    name: 'package.json',
    type: 'json',
    content: JSON.stringify(
      {
        name: 'my-app',
        version: '1.0.0',
        dependencies: {
          react: '^18.3.0',
          'react-file-carousel': '^0.1.0',
        },
      },
      null,
      2
    ),
  },
  {
    id: 'csv-2',
    name: 'products.csv',
    type: 'csv',
    content: `id,name,price,category
1,Widget A,9.99,Gadgets
2,Widget B,19.99,Gadgets
3,Gizmo X,49.99,Electronics
4,Doohickey,4.99,Accessories`,
  },
  {
    id: 'json-3',
    name: 'tsconfig.json',
    type: 'json',
    content: JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          module: 'ESNext',
          strict: true,
          jsx: 'react-jsx',
        },
        include: ['src'],
      },
      null,
      2
    ),
  },
  {
    id: 'text-2',
    name: 'changelog.txt',
    type: 'text',
    content: `Changelog
=========

v2.1.0 - 2026-02-28
- Added carousel arrow navigation
- Redesigned icon cards UI
- Configurable JSON indent

v2.0.0 - 2026-01-15
- Initial release`,
  },
  {
    id: 'csv-3',
    name: 'metrics.csv',
    type: 'csv',
    content: `date,views,clicks,conversions
2026-02-01,1200,340,42
2026-02-02,1350,380,51
2026-02-03,980,290,38
2026-02-04,1500,420,63`,
  },
  {
    id: 'json-4',
    name: 'settings.json',
    type: 'json',
    content: JSON.stringify(
      {
        theme: 'light',
        language: 'en',
        notifications: { email: true, push: false },
        privacy: { analytics: true },
      },
      null,
      2
    ),
  },
  {
    id: 'csv-4',
    name: 'exports.csv',
    type: 'csv',
    content: `id,sku,name\n1,A1,Item A\n2,B2,Item B`,
  },
  {
    id: 'json-5',
    name: 'env.json',
    type: 'json',
    content: JSON.stringify({ NODE_ENV: 'development', API_URL: 'http://localhost:3000' }, null, 2),
  },
  {
    id: 'text-3',
    name: 'readme.txt',
    type: 'text',
    content: 'Project readme. Install: npm install. Run: npm start.',
  },
  {
    id: 'json-6',
    name: 'i18n.json',
    type: 'json',
    content: JSON.stringify({ locale: 'en', strings: { hello: 'Hello', bye: 'Goodbye' } }, null, 2),
  },
  {
    id: 'csv-5',
    name: 'inventory.csv',
    type: 'csv',
    content: `product,qty\nWidget,100\nGadget,50`,
  },
  {
    id: 'text-4',
    name: 'todo.txt',
    type: 'text',
    content: '- Fix carousel scroll\n- Add tests\n- Update docs',
  },
  {
    id: 'json-7',
    name: 'manifest.json',
    type: 'json',
    content: JSON.stringify({ name: 'my-app', version: '1.0.0' }, null, 2),
  },
  {
    id: 'csv-6',
    name: 'sales.csv',
    type: 'csv',
    content: `month,revenue\n2026-01,5000\n2026-02,6200`,
  },
  {
    id: 'yaml-1',
    name: 'docker-compose.yaml',
    type: 'yaml',
    content: `version: "3.9"
services:
  app:
    image: myapp:latest
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production`,
  },
  {
    id: 'xml-1',
    name: 'pom.xml',
    type: 'xml',
    content: `<?xml version="1.0"?>
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>
</project>`,
  },
  {
    id: 'md-1',
    name: 'README.md',
    type: 'markdown',
    content: `# My Project

## Setup
\`\`\`bash
npm install
npm start
\`\`\`

## License
MIT`,
  },
  {
    id: 'log-1',
    name: 'app.log',
    type: 'log',
    content: `[2026-02-28 10:00:01] INFO  Server started on port 3000
[2026-02-28 10:00:02] INFO  Database connected
[2026-02-28 10:00:05] WARN  Cache miss for key: user:42`,
  },
  {
    id: 'tsv-1',
    name: 'data.tsv',
    type: 'tsv',
    content: `id\tname\tvalue\n1\tAlpha\t100\n2\tBeta\t200\n3\tGamma\t300`,
  },
];

type BarPosition = 'top' | 'bottom' | 'left' | 'right';

const positions: BarPosition[] = ['top', 'bottom', 'left', 'right'];

const sectionStyle = { marginBottom: '3rem' } as const;
const headingStyle = { fontSize: '1.125rem', marginBottom: '0.5rem' } as const;

function App() {
  const [position, setPosition] = useState<BarPosition>('top');
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        react-file-carousel demo
      </h1>

      {/* Configurable demo */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Interactive Demo</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            marginBottom: '0.75rem',
            fontSize: '0.875rem',
          }}
        >
          <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <legend style={{ fontWeight: 600, marginRight: '0.25rem', float: 'left', lineHeight: '1.5rem' }}>
              Position:
            </legend>
            {positions.map((pos) => (
              <label key={pos} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="position"
                  value={pos}
                  checked={position === pos}
                  onChange={() => setPosition(pos)}
                />
                {pos}
              </label>
            ))}
          </fieldset>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={expanded}
              onChange={(e) => setExpanded(e.target.checked)}
            />
            Expanded
          </label>
        </div>
        <div style={{ height: 450 }}>
          <FileCarousel
            files={sampleFiles}
            barPosition={position}
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0' }} />

      {/* Static demos */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Bar Position: Top (default)</h2>
        <div style={{ height: 400 }}>
          <FileCarousel files={sampleFiles} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Bar Position: Bottom</h2>
        <div style={{ height: 400 }}>
          <FileCarousel files={sampleFiles} barPosition="bottom" />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Bar Position: Left</h2>
        <div style={{ height: 400 }}>
          <FileCarousel files={sampleFiles} barPosition="left" />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Bar Position: Right</h2>
        <div style={{ height: 400 }}>
          <FileCarousel files={sampleFiles} barPosition="right" />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Expandable Grid View (starts expanded)</h2>
        <div style={{ height: 500 }}>
          <FileCarousel files={sampleFiles} defaultExpanded={true} />
        </div>
      </section>
    </div>
  );
}

export default App;
