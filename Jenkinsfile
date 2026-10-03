pipeline {
    agent any

    tools {
        nodejs 'NodeJs'   // Nombre EXACTO de la instalación en Manage Jenkins > Tools
    }

    environment {
        CI = 'true'
        NEXT_TELEMETRY_DISABLED = '1'
    }

    stages {
        // Etapa 1: Checkout del código desde GitHub
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Al3xbarg/prototipo-ui-ux-axy.git'
            }
        }

        // Etapa 2: Instalar dependencias y build del proyecto (Next.js)
        stage('Build') {
            steps {
                sh 'node -v && npm -v'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        // Etapa 3: Pruebas unitarias con cobertura (Vitest) + reporte JUnit
        stage('Unit Tests') {
            steps {
                sh 'npm run test:coverage'
            }
            post {
                always {
                    junit testResults: 'test-results/*.xml', allowEmptyResults: true
                    archiveArtifacts artifacts: 'test-results/*.xml', allowEmptyArchive: true
                }
            }
        }

        // Etapa 4: Análisis de calidad con SonarQube
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Nombre EXACTO del "SonarQube Scanner" en Manage Jenkins > Tools
                    def scannerHome = tool 'MySonarQube'
                    // 'SonarQube' = nombre del servidor en Manage Jenkins > System
                    withSonarQubeEnv('SonarQube') {
                        // La config del proyecto está en sonar-project.properties.
                        // Aquí solo pasamos la URL y el token (los inyecta withSonarQubeEnv).
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                              -Dsonar.host.url=\${SONAR_HOST_URL} \
                              -Dsonar.token=\${SONAR_AUTH_TOKEN}
                        """
                    }
                }
            }
        }

        // Etapa 5: Esperar el resultado del Quality Gate de SonarQube
        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    // Post-actions: notificaciones de éxito / fallo
    post {
        success {
            echo '¡Pipeline ejecutado con éxito y calidad aprobada!'
        }
        failure {
            echo 'Pipeline fallido. Revisar logs (build, pruebas o Quality Gate).'
        }
    }
}
