def getEnvForSuite() {
  // Base environment variables
  def envVars = [
    "NVM_DIR=${env.HOME}/.nvm",
    "ANDROID_HOME=${env.HOME}/Library/Android/sdk"
  ]

  // Add test suite specific environment variables
  // switch(suiteName) {
  //   case 'test':
  //     envVars.add("NOCK_OFF=true")
  //     break
  //   default:
  //     error("Unknown test suite environment ${suiteName}")
  // }

  return envVars
}

def setupNodeAndTest() {
  // get version
  echo 'NVM_DIR set to $NVM_DIR'
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
      set -o pipefail
      source ~/.bash_profile

      cd ios
      bundle install
      bundle exec pod repo update
      bundle exec pod install

      cd ..
      xcodebuild -workspace ios/vybe.xcworkspace -scheme Production archive -archivePath ./build/Production.xcarchive
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
