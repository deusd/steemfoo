def getEnvForSuite() {
  // Base environment variables
  def envVars = [
   "NVM_DIR=${env.HOME}/.nvm",
   "ANDROID_HOME=${env.HOME}/Library/Android/sdk",
   "PATH+ANDRIOD=${env.HOME}/Library/Android/platform-tools/",
   "PATH+BIN=/usr/local/bin",
   "PATH+RBENV=${env.HOME}/.rbenv/bin",
   "PATH+RBENV_SHIM=${env.HOME}/.rbenv/shims",
   "GEM_HOME=${env.HOME}/src/gems",
   "LC_ALL=en_US.UTF-8",
   "LANG=en_US.UTF-8"
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
      react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
      cd android
      bundle install
      bundle exec fastlane build
      """
  }
}

def buildIos() {
  withEnv(getEnvForSuite()) {
    withCredentials([
      string(credentialsId: 'match-password', variable: 'MATCH_PASSWORD'),
      string(credentialsId: 'fastlane-password', variable: 'FASTLANE_PASSWORD'),
      string(credentialsId: 'match-keychain-password', variable: 'MATCH_KEYCHAIN_PASSWORD'),
      string(credentialsId: 'match-keychain-name', variable: 'MATCH_KEYCHAIN_NAME')
    ]) {
      dir("ios") {
        sh """
          react-native bundle --dev false --entry-file index.js --bundle-output ./main.jsbundle --platform ios
          bundle install
          """
        if ( !fileExists("${env.HOME}/.cocoapods/repos/master/.git/index.lock") ) {
          sh "bundle exec pod repo update"
        }
        sh """
          bundle exec pod install
          bundle exec fastlane build
          """
      }
    }
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
      when { anyOf { changeRequest(); branch 'master' } }

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

