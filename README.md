# Prometheus-test

Testing ground for Prometheus configuration
The goal is to have a read to run Prometheus deployment on docker-compose.

The package includes:

- a local Prometheus server
- a local node-exporter target
- a local Alertmanager

All of these services are running on the same network named "prometheus".

## files

- `prometheus.yml` is the Prometheus configuration file
- `rules.yml` is the alerting rules file
- `alertmanager.yml` is the alertmanager configuration file

## Useful command

- `docker compose up -d` or `docker-compose up -d` to start the services
- `docker compose down` or `docker-compose down` to stop the services
- `curl -X POST localhost:9090/-/reload` to reload the Prometheus configuration
- `promtool check config prometheus.yml` to check the Prometheus configuration (you need to install promtool)
- `promtool check rules rules.yml` to check the alerting rules (you need to install promtool)

In the latest version of docker, the command `docker-compose` has been package with docker.
But now the command is called with `docker compose` instead of `docker-compose`.
If you have a recent version of docker, might be interesting to create an alias:

```bash
alias docker-compose="docker compose"
```