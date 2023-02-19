# Super Offers

Repudiation (Denial of an act) is one of the major issues in creating offers or agreements with anyone online. It requires trust that a person would provide the money/service on completing the deal. SuperOffers solves this problem. The entire logic is handled on-chain without any DAO or third-party involved which makes it completely trust-free and transparent.

The workflow involves two different types of users:

1. Offerer
2. Claimer

The Offerer creates a super offer declaring the total bounty reward etc. Here comes the interesting part. Offer is not created by any off-chain logic. The offerer enters the contract address, contract abi and chooses a function signature and an expected value on calling the function. Multiple functions from multiple contracts can be added for the same offer. When any claimer satisfies this logic, he can apply for a claim and the smart contract starts streaming him tokens until the Offer timeline ends. This way the entire task completion and money streaming is done completely on-chain with no chance of denying an act or betrayal.

I am looking forward for the Streaming Distributions (Coming soon) feature in SuperFluid which would be the perfectly suited for this usecase. It would also save up some of my complex smart contract logic 😅.

Possible use cases for Super Offers can be:

1. Hold 2 Bored Ape NFTs
2. Hold 25 LINK Tokens.
3. Make 10 proposals in CompoundDAO
4. Hold Token #1200 in CyperPunks NFT collection.
   The possibilities are endless..

## Challenges

I struggled with developing the logic for my solidity smart contracts. I ran into a lot of issues when making low level calls to smart contracts and then when debugging and verifying the execution of the logic.
I have developed dApps with theGraph but this time I ran into a lot of issues in depolying my subgraph.
All other challenges were manageable :)

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
