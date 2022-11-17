# Prometheus-test

Testing ground for Prometheus configuration
The goal is to have a read to run Prometheus deployment on docker-compose.

The package includes:

- a local Prometheus server
- a local node-exporter target
- a local cadvisor target
- a local Alertmanager server
- a local Grafana server
- a local Grafana Renderer engine (only accessible by Grafana)
<!-- - a local Alertmanager-logger, express.js containerized app that will log any alerts detected in /logs files -->

All of these services are running on the same network named "prometheus".

## files

Each config file is store in the config folder under the name of the service.

- `prometheus.yml` is the Prometheus configuration file
- `rules.yml` is the alerting rules file
- `alertmanager.yml` is the alertmanager configuration file

### Grafana

- provisioning folder contains the default configuration for the Grafana datasources

- rendering folder contains the configuration for the Grafana rendering engine

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

## References variables

- `$value` is the value of the metric
- `$labels` is the labels array of the metric can be navigated with `$labels.<label_name>` You should visualize it as a json object
- `$labels.<label_name>` can also be define in labels on prometheus target configuration

```yaml
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
    labels:
      instance: 'prometheus'
      datacenter: 'poneyland'
```

In this example, $labels.datacenter will return `poneyland` as string

## Templating

Interpolate $value as a string

```yaml
summary: "Host high CPU load 
    {{ if le $value 0.1 }} Very low CPU load 
    {{ else if gt $value 0.1}} Moderate load 
    {{ else if gt $value 1}} Man this is loaded 
    {{ end }}"
```


## Useful links

- [Prometheus](https://prometheus.io/)
- [Prometheus template reference](https://prometheus.io/docs/prometheus/latest/configuration/template_reference/)
- [Go Template reference](https://golang.org/pkg/text/template/)
- [Prometheus alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)
- [Awesome Prometheus Rules](https://awesome-prometheus-alerts.grep.to/)
- [Grafana Renderer doc](https://grafana.com/docs/grafana/latest/setup-grafana/image-rendering/)
