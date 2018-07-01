pipeline {
  agent any

  stages {
    stage('Setup') {
      steps {
        echo 'Setup...'
        echo '------------------ node setup ---------------------'
        sh 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash'
        sh 'source ~/.bashrc'
        sh 'nvm install'
        sh 'nvm use'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
        echo '------------------ install ---------------------'
        sh 'yarn'

        echo '------------------ test ---------------------'
        sh 'yarn test'
      }
    }
  }
}
