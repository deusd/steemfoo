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
    sh "android/gradlew -b android/build.gradle"
  }
}

def buildIos() {
  withEnv(getEnvForSuite()) {
    sh """
      cd ios
      bundle install
      bundle exec pod repo update
      bundle exec pod install

      cd ..
      xcodebuild -workspace ios/vybe.xcworkspace -scheme Production archive -archivePath ./build/Production.xcarchive | xcpretty
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

