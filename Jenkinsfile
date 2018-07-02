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
    sh 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash'
  }

  catch(all) {
    echo 'NVM install failed but may already be installed, attempting to continue'
  }

  finally {
    // Run tests using creds
    withEnv(getEnvForSuite()) {
      // Actions:
      //  1. Load NVM
      //  2. Install/use required Node.js version
      //  3. Install mocha-jenkins-reporter so that we can get junit style output
      //  4. Run tests
      sh """
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        echo 'Grabbing nvm...'
        nvm install
        nvm use

        echo 'Installing dependencies...'
        yarn

        echo 'Testing...'
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
