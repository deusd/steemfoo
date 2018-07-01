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
  String version = readFile('.nvmrc').substring(1)
  echo "current node version is ${version}"

    // Run tests using creds
    nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh',
        nvmIoJsOrgMirror: 'https://iojs.org/dist',
        nvmNodeJsOrgMirror: 'https://nodejs.org/dist',
        version: version) {
      sh """
        echo 'Installing dependencies...'
        echo '------------------ install ---------------------'
        yarn

        echo 'Testing...'
        echo '------------------ test ---------------------'
        yarn test
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
  }
}
