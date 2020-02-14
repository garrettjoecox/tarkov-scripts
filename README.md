# Escape from Tarkov bot CLI

I learned a ton about reverse engineering creating this, so not too disappointed about getting banned. Code should be of use for someone but beware :)

## Installation
- Clone the repo
- Run `npm install`
- Run `npm run global` (this will install the global CLI `tarkov`)

## Usage

### `tarkov auth`
You will need to run this initially, and then when your accessToken expires. The first time you run it you will be prompted for your email, password, and HWID (HWID can optionally be generated). There is no option for captcha yet, I had resorted to just logging in to their website on the same IP and doing the captcha there was sufficient. If a new hardware ID is detected you will be prompted for the code sent to your email. Your login credentials (hashed password) are stored in a JSON file locally, check the source if you are worried.

### `tarkov session [base64 encoded session]`
This command is to start a game session and select a profile, or optionally use an existing session (One that you might have open on your PC). You can grab the exisitng session payload from sniffing the launcher traffic when the game launches. If no session is provided it will start one, and log you out elsewhere.

### `tarkov auto`
Will ask you a few questions, and begin buying items from the flea market and selling them to traders for profit, depending on your specified margins.

### `tarkov sellbox`
This will look for a container in your inventory tagged `sell` and begin selling items either on the flea market or just to traders based on your specified margin.

## Disclaimer
As I said I got banned, use this at your own risk. I will not be able to update it any further till I get my hands on another account. Until then feel free to submit PR's

## Todo:
- KeepAlive request
- Merge money stacks automatically
