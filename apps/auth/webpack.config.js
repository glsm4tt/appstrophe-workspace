const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "auth",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "auth",
        filename: "remoteEntry.js",
        exposes: {
          './routes': './apps/auth/src/app/auth/auth-routes.ts',
        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/fire": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/effects": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/entity": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/router-store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          
          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
