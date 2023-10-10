# MML Rooster

A search engine for the MML schedule page.

![Screenshot](screenshot.jpg)

## About

The official MML schedule page is quite frustrating to use, especially on mobile. This project aims to fix the flaws by presenting the information in a clean, responsive interface. It is still in development, so expect occasional bugs and don't be surprised if it breaks.

## How to use

Simply go to the url of your self-hosted instance, log in with your credentials and search for your schedule.

## Where did rooster.roembol.nl go?

Because of security concerns at the school IT department, rooster.roembol.nl had to be shut down. If you want to continue using the site, please host your own private instance using the instructions below.

## How to install

### Requirements

- A Linux server (tested on Debian)
- Docker
- Docker Compose

### Installation

| ❗ Note |
| :------ |

You are not allowed to share your instance with other people. Everyone who wants to use the app must run their own instance. Please consider password-protecting your instance, this README will be updated soon to provide instructions on that.

- Clone the repo to your server
- Create a `.env` file in the project root
  - You can find an example configuration in `.env.example`
  - Set `VITE_HOSTNAME` to where you will be hosting the app
- Run `make build-prod`
- Run `make run-prod` or `make run-prod-daemon` to start the app
- Don't forget to use a reverse-proxy like Caddy to enable HTTPS and add a login

## Development setup

WIP

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE).

## Credits

- [rooster.hetmml.nl](https://github.com/metiscoderclass/rooster.hetmml.nl) for the idea and the general design of the page
