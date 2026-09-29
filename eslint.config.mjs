import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/test-output',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            { sourceTag: 'type:domain',         onlyDependOnLibsWithTags: ['type:domain', 'type:util'] },
            { sourceTag: 'type:application',    onlyDependOnLibsWithTags: ['type:domain', 'type:util'] },
            { sourceTag: 'type:infrastructure', onlyDependOnLibsWithTags: ['type:application', 'type:domain', 'type:util'] },
            { sourceTag: 'type:ui',             onlyDependOnLibsWithTags: ['type:application', 'type:domain', 'type:util'] },
            { sourceTag: 'type:util',           onlyDependOnLibsWithTags: ['type:util'] },
            { sourceTag: 'type:app',            onlyDependOnLibsWithTags: ['*'] },
            { sourceTag: 'type:e2e',            onlyDependOnLibsWithTags: ['*'] },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];