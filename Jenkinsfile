pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        String nvmVersion = new File('.nvmrc').text
        nvm(nvmVersion) {
          echo 'Testing...'
          echo '------------------ install ---------------------'
          sh 'yarn'

          echo '------------------ test ---------------------'
          sh 'yarn test'
        }
      }
    }
  }
}
