pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        echo 'Testing...'
        echo '------------------ node setup ---------------------'
        sh 'nvm install'
        sh 'nvm use'

        echo '------------------ install ---------------------'
        sh 'yarn'

        echo '------------------ test ---------------------'
        sh 'yarn test'
      }
    }
  }
}
