module.exports = {
  name: 'mascot-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mascot-app/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ],
  coveragePathIgnorePatterns: ['src/testing']
};
