module.exports = {
   presets: [
      '@babel/preset-env',
      // Runtime automatic with React 17+ allows not importing React
      // in files only using JSX (no state or React methods)
      ['@babel/preset-react', { runtime: 'automatic' }]
   ],
   'plugins': [
      '@babel/plugin-transform-runtime',
      ['module-resolver', {
         'root': ['./'],
         'alias': {
            '@formElements': './src/js/components/common/formElements',
            '@utils': './src/js/utils',
            '@commonReact': './src/js/components/common',
            '@hooks': './src/js/hooks',
            '@components': './src/js/components',
            '@context': './src/js/context'

         }
      }]

   ]
};