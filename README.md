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
