def getEnvForSuite() {
  // Base environment variables
  def envVars = [
   "NVM_DIR=${env.HOME}/.nvm",
   "ANDROID_HOME=${env.HOME}",
   "PATH+BIN=/usr/local/bin",
   "PATH+RBENV=${env.HOME}/.rbenv/bin",
   "PATH+RBENV_SHIM=${env.HOME}/.rbenv/shims",
   "GEM_HOME=${env.HOME}/src/gems"
  ]

  return envVars
}

def setupNodeAndTest() {
  // get version
  String version = readFile('.nvmrc')

  // Run tests using creds
  withEnv(getEnvForSuite()) {
    nvm(version) {
      sh """
        npm install

        echo 'Testing...'
        npm test
        """
    }
  }
}

def buildAndroid() {
  withEnv(getEnvForSuite()) {
    sh """
      bundle install
      bundle exec fastlane build
      """
  }
}

def buildIos() {
  withEnv(getEnvForSuite()) {
    sh """
      react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --platform ios
      cd ios
      bundle install
      bundle exec pod repo update
      bundle exec pod install
      bundle exec fastlane build
      """
  }
}

pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        setupNodeAndTest();
      }
    }
    stage('Build') {
      failFast true
      parallel {
        stage('Build Android') {
          steps {
            buildAndroid();
          }
        }

        stage('Build Ios') {
          steps {
            buildIos();
          }
        }
      }
    }
  }
}

