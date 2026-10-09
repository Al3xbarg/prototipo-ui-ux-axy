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

        // Etapa 4: Escaneo de seguridad de dependencias con Snyk
        stage('Security Scan with Snyk') {
            steps {
                withCredentials([string(credentialsId: 'Snyk', variable: 'SNYK_TOKEN')]) {
                    script {
                        try {
                            // 1. Instalar Snyk CLI (+ generador de reporte HTML)
                            sh 'npm install -g snyk snyk-to-html'
                            // 2. Autenticación (comillas simples: el token lo expande el shell, no se expone)
                            sh 'snyk auth $SNYK_TOKEN'
                            // 3. Test de vulnerabilidades: falla si hay severidad alta o crítica
                            sh 'snyk test --all-projects --severity-threshold=high'
                            // 4. Monitoreo continuo en el dashboard de Snyk (opcional)
                            sh 'snyk monitor --all-projects'
                        } catch (err) {
                            echo "Snyk encontró vulnerabilidades (o falló): ${err}"
                            // No rompe el pipeline: lo marca como INESTABLE
                            currentBuild.result = 'UNSTABLE'
                        } finally {
                            // Reporte HTML (siempre, aunque haya vulnerabilidades)
                            sh 'snyk test --all-projects --json-file-output=snyk_results.json || true'
                            sh 'snyk-to-html -i snyk_results.json -o snyk_report.html || true'
                            archiveArtifacts artifacts: 'snyk_report.html, snyk_results.json', allowEmptyArchive: true
                            // Publica el reporte en Jenkins (requiere el plugin "HTML Publisher")
                            publishHTML target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: '.',
                                reportFiles: 'snyk_report.html',
                                reportName: 'Snyk Security Report'
                            ]
                        }
                    }
                }
            }
        }

        // Etapa 5: Análisis de calidad con SonarQube
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

        // Etapa 6: Esperar el resultado del Quality Gate de SonarQube
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
        unstable {
            echo 'Pipeline INESTABLE: Snyk detectó vulnerabilidades. Revisar el reporte.'
        }
        failure {
            echo 'Pipeline fallido. Revisar logs (build, pruebas, Snyk o Quality Gate).'
        }
    }
}
