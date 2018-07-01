def getEnvForSuite() {
  // Base environment variables
  def envVars = [
    "NVM_DIR=${env.HOME}/.nvm"
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
  String version = readFile('.nvmrc')
  sh 'current node version is ${version}'

  finally {
    // Run tests using creds
    nvm(version) {
      sh """
        echo 'Grabbing nvm...'

        echo 'Installing dependencies...'
        echo '------------------ install ---------------------'
        yarn

        echo 'Testing...'
        echo '------------------ test ---------------------'
        yarn test
      """
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
  }
}
