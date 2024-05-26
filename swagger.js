const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${process.env.APP_NAME} API`,
            description: `Welcome to the ${process.env.APP_NAME} API documentation.`,
            contact: {
                name: `${process.env.APP_NAME}`,
                email: `${process.env.CONTACT_EMAIL}`,
                url: `${process.env.BASE_URL}`
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "https://app.sandbox.domain.com",
                description: "Sandbox server"
            },
            {
                url: "https://app.domain.com",
                description: "Live server"
            },
        ],
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        }
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js']
}

const coustomOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: `${process.env.APP_NAME} `,
    customfavIcon: "/public/favicon.ico"
}

const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, coustomOptions))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

module.exports = swaggerDocs