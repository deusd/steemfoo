pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        echo 'Testing...'
        checkout scm
        nvm install
        nvm use
        yarn
        yarn test
      }
    }
  }
}
