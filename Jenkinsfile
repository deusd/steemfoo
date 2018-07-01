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
  echo 'NVM_DIR set to $NVM_DIR'
  String version = readFile('.nvmrc').substring(1)

  try {
    // Install NVM
    sh 'wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash'
  }

  catch(all) {
    echo 'NVM install failed but may already be installed, attempting to continue'
  }

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
