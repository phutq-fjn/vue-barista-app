/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

import { createApp } from 'vue'
import App from './App.vue'

// Vuestic theming
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

// Global event bus
import mitt from 'mitt'
const emitter = mitt()

// Amplify imports
import Amplify from 'aws-amplify'

// Phone number handling
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

/* ===================================================
                      CONFIGURATION
    You must add your own values here! See the GitHub
    repo for more information. @jbesw
   =================================================== */

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    identityPoolRegion: 'us-east-1',
    userPoolId: 'us-east-1_t41jWfi0B',
    userPoolWebClientId: '2gicjcsrrlve0ohst7qlato2g9',
    mandatorySignIn: false,
    authenticationFlowType: 'CUSTOM_AUTH',
  }
})

const app = createApp(App).use(VuesticPlugin)
app.config.globalProperties.emitter = emitter
app.use(VueTelInput)

app.config.globalProperties.$appName = 'Barista'
app.config.globalProperties.$adminApp = true

// ** Backend config **
app.config.globalProperties.$region = 'us-east-1'
app.config.globalProperties.$APIurl = 'https://ti6ikuttqd.execute-api.us-east-1.amazonaws.com/Prod'
app.config.globalProperties.$APIconfigURL = 'https://6zxljsz6al.execute-api.us-east-1.amazonaws.com/Prod'
app.config.globalProperties.$ConfigEndpoint = 'https://ti6ikuttqd.execute-api.us-east-1.amazonaws.com/Prod'

// ** Websocket connection **
//  PoolId: Retrieve this with the CLI command: aws cognito-identity list-identity-pools --max-results 10 --region <<REGION>>
app.config.globalProperties.$poolId = '<< ENTER YOUR VALUE >>' // 'YourCognitoIdentityPoolId'
//  IoTendpoint: Retrieve this with the CLI command: aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-west-2
app.config.globalProperties.$host = '<< ENTER YOUR VALUE >>' // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'

app.mount('#app')