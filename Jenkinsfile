pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'checkout scm'
        sh 'nvm install'
        sh 'nvm use'
        sh 'yarn'
        sh 'yarn test'
      }
    }
  }
}
