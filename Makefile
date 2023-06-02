build:
	cd client && $(MAKE) build
	cd server && $(MAKE) build

build-prod:
	docker compose -f docker-compose-prod.yml build

run-dev:
	docker compose -f docker-compose-dev.yml up

run-prod:
	docker compose -f docker-compose-prod.yml up

run-prod-daemon:
	docker compose -f docker-compose-prod.yml up -d

stop-prod:
	docker compose -f docker-compose-prod.yml down
