import { RulesData } from "@/types/rules"

export const rulesData: RulesData = {
  groups: [
    {
      name: "Basic resource monitoring",
      services: [
        {
          name: "Prometheus self-monitoring",
          exporters: [
            {
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Prometheus job missing",
                  description: "A Prometheus job has disappeared",
                  query: 'absent(up{job="prometheus"})',
                  severity: "warning",
                  content:
                    '- alert: PrometheusJobMissing\r\n      expr: \'absent(up{job="prometheus"})\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus job missing (instance {{ $labels.instance }})\r\n        description: "A Prometheus job has disappeared\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Prometheus target missing",
                  description:
                    "A Prometheus target has disappeared. An exporter might be crashed.",
                  query: "up == 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTargetMissing\r\n      expr: 'up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus target missing (instance {{ $labels.instance }})\r\n        description: \"A Prometheus target has disappeared. An exporter might be crashed.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus all targets missing",
                  description:
                    "A Prometheus job does not have living target anymore.",
                  query: "sum by (job) (up) == 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusAllTargetsMissing\r\n      expr: 'sum by (job) (up) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus all targets missing (instance {{ $labels.instance }})\r\n        description: \"A Prometheus job does not have living target anymore.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus target missing with warmup time",
                  description:
                    "Allow a job time to start up (10 minutes) before alerting that it's down.",
                  query:
                    "sum by (instance, job) ((up == 0) * on (instance) group_right(job) (node_time_seconds - node_boot_time_seconds > 600))",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTargetMissingWithWarmupTime\r\n      expr: 'sum by (instance, job) ((up == 0) * on (instance) group_right(job) (node_time_seconds - node_boot_time_seconds > 600))'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus target missing with warmup time (instance {{ $labels.instance }})\r\n        description: \"Allow a job time to start up (10 minutes) before alerting that it's down.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus configuration reload failure",
                  description: "Prometheus configuration reload error",
                  query: "prometheus_config_last_reload_successful != 1",
                  severity: "warning",
                  content:
                    "- alert: PrometheusConfigurationReloadFailure\r\n      expr: 'prometheus_config_last_reload_successful != 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus configuration reload failure (instance {{ $labels.instance }})\r\n        description: \"Prometheus configuration reload error\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus too many restarts",
                  description:
                    "Prometheus has restarted more than twice in the last 15 minutes. It might be crashlooping.",
                  query:
                    'changes(process_start_time_seconds{job=~"prometheus|pushgateway|alertmanager"}[15m]) > 2',
                  severity: "warning",
                  content:
                    '- alert: PrometheusTooManyRestarts\r\n      expr: \'changes(process_start_time_seconds{job=~"prometheus|pushgateway|alertmanager"}[15m]) > 2\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus too many restarts (instance {{ $labels.instance }})\r\n        description: "Prometheus has restarted more than twice in the last 15 minutes. It might be crashlooping.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Prometheus AlertManager job missing",
                  description: "A Prometheus AlertManager job has disappeared",
                  query: 'absent(up{job="alertmanager"})',
                  severity: "warning",
                  content:
                    '- alert: PrometheusAlertmanagerJobMissing\r\n      expr: \'absent(up{job="alertmanager"})\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus AlertManager job missing (instance {{ $labels.instance }})\r\n        description: "A Prometheus AlertManager job has disappeared\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Prometheus AlertManager configuration reload failure",
                  description: "AlertManager configuration reload error",
                  query: "alertmanager_config_last_reload_successful != 1",
                  severity: "warning",
                  content:
                    "- alert: PrometheusAlertmanagerConfigurationReloadFailure\r\n      expr: 'alertmanager_config_last_reload_successful != 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus AlertManager configuration reload failure (instance {{ $labels.instance }})\r\n        description: \"AlertManager configuration reload error\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus AlertManager config not synced",
                  description:
                    "Configurations of AlertManager cluster instances are out of sync",
                  query:
                    'count(count_values("config_hash", alertmanager_config_hash)) > 1',
                  severity: "warning",
                  content:
                    '- alert: PrometheusAlertmanagerConfigNotSynced\r\n      expr: \'count(count_values("config_hash", alertmanager_config_hash)) > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus AlertManager config not synced (instance {{ $labels.instance }})\r\n        description: "Configurations of AlertManager cluster instances are out of sync\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Prometheus AlertManager E2E dead man switch",
                  description:
                    "Prometheus DeadManSwitch is an always-firing alert. It's used as an end-to-end test of Prometheus through the Alertmanager.",
                  query: "vector(1)",
                  severity: "critical",
                  content:
                    "- alert: PrometheusAlertmanagerE2eDeadManSwitch\r\n      expr: 'vector(1)'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus AlertManager E2E dead man switch (instance {{ $labels.instance }})\r\n        description: \"Prometheus DeadManSwitch is an always-firing alert. It's used as an end-to-end test of Prometheus through the Alertmanager.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus not connected to alertmanager",
                  description: "Prometheus cannot connect the alertmanager",
                  query:
                    "prometheus_notifications_alertmanagers_discovered < 1",
                  severity: "critical",
                  content:
                    "- alert: PrometheusNotConnectedToAlertmanager\r\n      expr: 'prometheus_notifications_alertmanagers_discovered < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus not connected to alertmanager (instance {{ $labels.instance }})\r\n        description: \"Prometheus cannot connect the alertmanager\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus rule evaluation failures",
                  description:
                    "Prometheus encountered {{ $value }} rule evaluation failures, leading to potentially ignored alerts.",
                  query:
                    "increase(prometheus_rule_evaluation_failures_total[3m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusRuleEvaluationFailures\r\n      expr: 'increase(prometheus_rule_evaluation_failures_total[3m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus rule evaluation failures (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} rule evaluation failures, leading to potentially ignored alerts.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus template text expansion failures",
                  description:
                    "Prometheus encountered {{ $value }} template text expansion failures",
                  query:
                    "increase(prometheus_template_text_expansion_failures_total[3m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTemplateTextExpansionFailures\r\n      expr: 'increase(prometheus_template_text_expansion_failures_total[3m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus template text expansion failures (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} template text expansion failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus rule evaluation slow",
                  description:
                    "Prometheus rule evaluation took more time than the scheduled interval. It indicates a slower storage backend access or too complex query.",
                  query:
                    "prometheus_rule_group_last_duration_seconds > prometheus_rule_group_interval_seconds",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: PrometheusRuleEvaluationSlow\r\n      expr: 'prometheus_rule_group_last_duration_seconds > prometheus_rule_group_interval_seconds'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus rule evaluation slow (instance {{ $labels.instance }})\r\n        description: \"Prometheus rule evaluation took more time than the scheduled interval. It indicates a slower storage backend access or too complex query.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus notifications backlog",
                  description:
                    "The Prometheus notification queue has not been empty for 10 minutes",
                  query:
                    "min_over_time(prometheus_notifications_queue_length[10m]) > 0",
                  severity: "warning",
                  content:
                    "- alert: PrometheusNotificationsBacklog\r\n      expr: 'min_over_time(prometheus_notifications_queue_length[10m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus notifications backlog (instance {{ $labels.instance }})\r\n        description: \"The Prometheus notification queue has not been empty for 10 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus AlertManager notification failing",
                  description: "Alertmanager is failing sending notifications",
                  query:
                    "rate(alertmanager_notifications_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusAlertmanagerNotificationFailing\r\n      expr: 'rate(alertmanager_notifications_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus AlertManager notification failing (instance {{ $labels.instance }})\r\n        description: \"Alertmanager is failing sending notifications\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus target empty",
                  description: "Prometheus has no target in service discovery",
                  query: "prometheus_sd_discovered_targets == 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTargetEmpty\r\n      expr: 'prometheus_sd_discovered_targets == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus target empty (instance {{ $labels.instance }})\r\n        description: \"Prometheus has no target in service discovery\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus target scraping slow",
                  description:
                    "Prometheus is scraping exporters slowly since it exceeded the requested interval time. Your Prometheus server is under-provisioned.",
                  query:
                    'prometheus_target_interval_length_seconds{quantile="0.9"} / on (interval, instance, job) prometheus_target_interval_length_seconds{quantile="0.5"} > 1.05',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: PrometheusTargetScrapingSlow\r\n      expr: \'prometheus_target_interval_length_seconds{quantile="0.9"} / on (interval, instance, job) prometheus_target_interval_length_seconds{quantile="0.5"} > 1.05\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus target scraping slow (instance {{ $labels.instance }})\r\n        description: "Prometheus is scraping exporters slowly since it exceeded the requested interval time. Your Prometheus server is under-provisioned.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Prometheus large scrape",
                  description:
                    "Prometheus has many scrapes that exceed the sample limit",
                  query:
                    "increase(prometheus_target_scrapes_exceeded_sample_limit_total[10m]) > 10",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: PrometheusLargeScrape\r\n      expr: 'increase(prometheus_target_scrapes_exceeded_sample_limit_total[10m]) > 10'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus large scrape (instance {{ $labels.instance }})\r\n        description: \"Prometheus has many scrapes that exceed the sample limit\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus target scrape duplicate",
                  description:
                    "Prometheus has many samples rejected due to duplicate timestamps but different values",
                  query:
                    "increase(prometheus_target_scrapes_sample_duplicate_timestamp_total[5m]) > 0",
                  severity: "warning",
                  content:
                    "- alert: PrometheusTargetScrapeDuplicate\r\n      expr: 'increase(prometheus_target_scrapes_sample_duplicate_timestamp_total[5m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus target scrape duplicate (instance {{ $labels.instance }})\r\n        description: \"Prometheus has many samples rejected due to duplicate timestamps but different values\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB checkpoint creation failures",
                  description:
                    "Prometheus encountered {{ $value }} checkpoint creation failures",
                  query:
                    "increase(prometheus_tsdb_checkpoint_creations_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbCheckpointCreationFailures\r\n      expr: 'increase(prometheus_tsdb_checkpoint_creations_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB checkpoint creation failures (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} checkpoint creation failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB checkpoint deletion failures",
                  description:
                    "Prometheus encountered {{ $value }} checkpoint deletion failures",
                  query:
                    "increase(prometheus_tsdb_checkpoint_deletions_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbCheckpointDeletionFailures\r\n      expr: 'increase(prometheus_tsdb_checkpoint_deletions_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB checkpoint deletion failures (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} checkpoint deletion failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB compactions failed",
                  description:
                    "Prometheus encountered {{ $value }} TSDB compactions failures",
                  query:
                    "increase(prometheus_tsdb_compactions_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbCompactionsFailed\r\n      expr: 'increase(prometheus_tsdb_compactions_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB compactions failed (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} TSDB compactions failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB head truncations failed",
                  description:
                    "Prometheus encountered {{ $value }} TSDB head truncation failures",
                  query:
                    "increase(prometheus_tsdb_head_truncations_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbHeadTruncationsFailed\r\n      expr: 'increase(prometheus_tsdb_head_truncations_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB head truncations failed (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} TSDB head truncation failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB reload failures",
                  description:
                    "Prometheus encountered {{ $value }} TSDB reload failures",
                  query:
                    "increase(prometheus_tsdb_reloads_failures_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbReloadFailures\r\n      expr: 'increase(prometheus_tsdb_reloads_failures_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB reload failures (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} TSDB reload failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB WAL corruptions",
                  description:
                    "Prometheus encountered {{ $value }} TSDB WAL corruptions",
                  query:
                    "increase(prometheus_tsdb_wal_corruptions_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbWalCorruptions\r\n      expr: 'increase(prometheus_tsdb_wal_corruptions_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB WAL corruptions (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} TSDB WAL corruptions\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus TSDB WAL truncations failed",
                  description:
                    "Prometheus encountered {{ $value }} TSDB WAL truncation failures",
                  query:
                    "increase(prometheus_tsdb_wal_truncations_failed_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: PrometheusTsdbWalTruncationsFailed\r\n      expr: 'increase(prometheus_tsdb_wal_truncations_failed_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Prometheus TSDB WAL truncations failed (instance {{ $labels.instance }})\r\n        description: \"Prometheus encountered {{ $value }} TSDB WAL truncation failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Prometheus timeseries cardinality",
                  description:
                    'The "{{ $labels.name }}" timeseries cardinality is getting very high: {{ $value }}',
                  query:
                    'label_replace(count by(__name__) ({__name__=~".+"}), "name", "$1", "__name__", "(.+)") > 10000',
                  severity: "warning",
                  content:
                    '- alert: PrometheusTimeseriesCardinality\r\n      expr: \'label_replace(count by(__name__) ({__name__=~".+"}), "name", "$1", "__name__", "(.+)") > 10000\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Prometheus timeseries cardinality (instance {{ $labels.instance }})\r\n        description: "The "{{ $labels.name }}" timeseries cardinality is getting very high: {{ $value }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Host and hardware",
          exporters: [
            {
              name: "node-exporter",
              slug: "node-exporter",
              doc_url: "https://github.com/prometheus/node_exporter",
              rules: [
                {
                  name: "Host out of memory",
                  description: "Node memory is filling up (< 10% left)",
                  query:
                    '(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 < 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostOutOfMemory\r\n      expr: \'(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 < 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host out of memory (instance {{ $labels.instance }})\r\n        description: "Node memory is filling up (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host memory under memory pressure",
                  description:
                    "The node is under heavy memory pressure. High rate of major page faults",
                  query:
                    '(rate(node_vmstat_pgmajfault[1m]) > 1000) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostMemoryUnderMemoryPressure\r\n      expr: \'(rate(node_vmstat_pgmajfault[1m]) > 1000) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host memory under memory pressure (instance {{ $labels.instance }})\r\n        description: "The node is under heavy memory pressure. High rate of major page faults\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host Memory is underutilized",
                  description:
                    "Node memory is < 20% for 1 week. Consider reducing memory space. (instance {{ $labels.instance }})",
                  query:
                    '(100 - (avg_over_time(node_memory_MemAvailable_bytes[30m]) / node_memory_MemTotal_bytes * 100) < 20) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "info",
                  for: "1w",
                  comments:
                    "You may want to increase the alert manager 'repeat_interval' for this type of alert to daily or weekly\n",
                  content:
                    "# You may want to increase the alert manager 'repeat_interval' for this type of alert to daily or weekly\r\n    - alert: HostMemoryIsUnderutilized\r\n      expr: '(100 - (avg_over_time(node_memory_MemAvailable_bytes[30m]) / node_memory_MemTotal_bytes * 100) < 20) * on(instance) group_left (nodename) node_uname_info{nodename=~\".+\"}'\r\n      for: 1w\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Host Memory is underutilized (instance {{ $labels.instance }})\r\n        description: \"Node memory is < 20% for 1 week. Consider reducing memory space. (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Host unusual network throughput in",
                  description:
                    "Host network interfaces are probably receiving too much data (> 100 MB/s)",
                  query:
                    '(sum by (instance) (rate(node_network_receive_bytes_total[2m])) / 1024 / 1024 > 100) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostUnusualNetworkThroughputIn\r\n      expr: \'(sum by (instance) (rate(node_network_receive_bytes_total[2m])) / 1024 / 1024 > 100) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual network throughput in (instance {{ $labels.instance }})\r\n        description: "Host network interfaces are probably receiving too much data (> 100 MB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual network throughput out",
                  description:
                    "Host network interfaces are probably sending too much data (> 100 MB/s)",
                  query:
                    '(sum by (instance) (rate(node_network_transmit_bytes_total[2m])) / 1024 / 1024 > 100) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostUnusualNetworkThroughputOut\r\n      expr: \'(sum by (instance) (rate(node_network_transmit_bytes_total[2m])) / 1024 / 1024 > 100) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual network throughput out (instance {{ $labels.instance }})\r\n        description: "Host network interfaces are probably sending too much data (> 100 MB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual disk read rate",
                  description:
                    "Disk is probably reading too much data (> 50 MB/s)",
                  query:
                    '(sum by (instance) (rate(node_disk_read_bytes_total[2m])) / 1024 / 1024 > 50) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostUnusualDiskReadRate\r\n      expr: \'(sum by (instance) (rate(node_disk_read_bytes_total[2m])) / 1024 / 1024 > 50) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual disk read rate (instance {{ $labels.instance }})\r\n        description: "Disk is probably reading too much data (> 50 MB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual disk write rate",
                  description:
                    "Disk is probably writing too much data (> 50 MB/s)",
                  query:
                    '(sum by (instance) (rate(node_disk_written_bytes_total[2m])) / 1024 / 1024 > 50) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostUnusualDiskWriteRate\r\n      expr: \'(sum by (instance) (rate(node_disk_written_bytes_total[2m])) / 1024 / 1024 > 50) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual disk write rate (instance {{ $labels.instance }})\r\n        description: "Disk is probably writing too much data (> 50 MB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host out of disk space",
                  description: "Disk is almost full (< 10% left)",
                  query:
                    '((node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  comments:
                    'Please add ignored mountpoints in node_exporter parameters like\n"--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".\nSame rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.\n',
                  for: "2m",
                  content:
                    '# Please add ignored mountpoints in node_exporter parameters like\n"--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".\nSame rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.\r\n    - alert: HostOutOfDiskSpace\r\n      expr: \'((node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host out of disk space (instance {{ $labels.instance }})\r\n        description: "Disk is almost full (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host disk will fill in 24 hours",
                  description:
                    "Filesystem is predicted to run out of space within the next 24 hours at current write rate",
                  query:
                    '((node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) predict_linear(node_filesystem_avail_bytes{fstype!~"tmpfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  comments:
                    'Please add ignored mountpoints in node_exporter parameters like\n"--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".\nSame rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.\n',
                  for: "2m",
                  content:
                    '# Please add ignored mountpoints in node_exporter parameters like\n"--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".\nSame rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.\r\n    - alert: HostDiskWillFillIn24Hours\r\n      expr: \'((node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) predict_linear(node_filesystem_avail_bytes{fstype!~"tmpfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host disk will fill in 24 hours (instance {{ $labels.instance }})\r\n        description: "Filesystem is predicted to run out of space within the next 24 hours at current write rate\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host out of inodes",
                  description:
                    "Disk is almost running out of available inodes (< 10% left)",
                  query:
                    '(node_filesystem_files_free{fstype!="msdosfs"} / node_filesystem_files{fstype!="msdosfs"} * 100 < 10 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostOutOfInodes\r\n      expr: \'(node_filesystem_files_free{fstype!="msdosfs"} / node_filesystem_files{fstype!="msdosfs"} * 100 < 10 and ON (instance, device, mountpoint) node_filesystem_readonly == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host out of inodes (instance {{ $labels.instance }})\r\n        description: "Disk is almost running out of available inodes (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host filesystem device error",
                  description:
                    "{{ $labels.instance }}: Device error with the {{ $labels.mountpoint }} filesystem",
                  query: "node_filesystem_device_error == 1",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: HostFilesystemDeviceError\r\n      expr: 'node_filesystem_device_error == 1'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Host filesystem device error (instance {{ $labels.instance }})\r\n        description: \"{{ $labels.instance }}: Device error with the {{ $labels.mountpoint }} filesystem\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Host inodes will fill in 24 hours",
                  description:
                    "Filesystem is predicted to run out of inodes within the next 24 hours at current write rate",
                  query:
                    '(node_filesystem_files_free{fstype!="msdosfs"} / node_filesystem_files{fstype!="msdosfs"} * 100 < 10 and predict_linear(node_filesystem_files_free{fstype!="msdosfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly{fstype!="msdosfs"} == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostInodesWillFillIn24Hours\r\n      expr: \'(node_filesystem_files_free{fstype!="msdosfs"} / node_filesystem_files{fstype!="msdosfs"} * 100 < 10 and predict_linear(node_filesystem_files_free{fstype!="msdosfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly{fstype!="msdosfs"} == 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host inodes will fill in 24 hours (instance {{ $labels.instance }})\r\n        description: "Filesystem is predicted to run out of inodes within the next 24 hours at current write rate\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual disk read latency",
                  description:
                    "Disk latency is growing (read operations > 100ms)",
                  query:
                    '(rate(node_disk_read_time_seconds_total[1m]) / rate(node_disk_reads_completed_total[1m]) > 0.1 and rate(node_disk_reads_completed_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostUnusualDiskReadLatency\r\n      expr: \'(rate(node_disk_read_time_seconds_total[1m]) / rate(node_disk_reads_completed_total[1m]) > 0.1 and rate(node_disk_reads_completed_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual disk read latency (instance {{ $labels.instance }})\r\n        description: "Disk latency is growing (read operations > 100ms)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual disk write latency",
                  description:
                    "Disk latency is growing (write operations > 100ms)",
                  query:
                    '(rate(node_disk_write_time_seconds_total[1m]) / rate(node_disk_writes_completed_total[1m]) > 0.1 and rate(node_disk_writes_completed_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostUnusualDiskWriteLatency\r\n      expr: \'(rate(node_disk_write_time_seconds_total[1m]) / rate(node_disk_writes_completed_total[1m]) > 0.1 and rate(node_disk_writes_completed_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual disk write latency (instance {{ $labels.instance }})\r\n        description: "Disk latency is growing (write operations > 100ms)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host high CPU load",
                  description: "CPU load is > 80%",
                  query:
                    '(sum by (instance) (avg by (mode, instance) (rate(node_cpu_seconds_total{mode!="idle"}[2m]))) > 0.8) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "10m",
                  content:
                    '- alert: HostHighCpuLoad\r\n      expr: \'(sum by (instance) (avg by (mode, instance) (rate(node_cpu_seconds_total{mode!="idle"}[2m]))) > 0.8) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host high CPU load (instance {{ $labels.instance }})\r\n        description: "CPU load is > 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host CPU is underutilized",
                  description:
                    "CPU load is < 20% for 1 week. Consider reducing the number of CPUs.",
                  query:
                    '(100 - (rate(node_cpu_seconds_total{mode="idle"}[30m]) * 100) < 20) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "info",
                  for: "1w",
                  comments:
                    "You may want to increase the alert manager 'repeat_interval' for this type of alert to daily or weekly\n",
                  content:
                    '# You may want to increase the alert manager \'repeat_interval\' for this type of alert to daily or weekly\r\n    - alert: HostCpuIsUnderutilized\r\n      expr: \'(100 - (rate(node_cpu_seconds_total{mode="idle"}[30m]) * 100) < 20) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 1w\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Host CPU is underutilized (instance {{ $labels.instance }})\r\n        description: "CPU load is < 20% for 1 week. Consider reducing the number of CPUs.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host CPU steal noisy neighbor",
                  description:
                    "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.",
                  query:
                    '(avg by(instance) (rate(node_cpu_seconds_total{mode="steal"}[5m])) * 100 > 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  content:
                    '- alert: HostCpuStealNoisyNeighbor\r\n      expr: \'(avg by(instance) (rate(node_cpu_seconds_total{mode="steal"}[5m])) * 100 > 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host CPU steal noisy neighbor (instance {{ $labels.instance }})\r\n        description: "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host CPU high iowait",
                  description:
                    "CPU iowait > 10%. A high iowait means that you are disk or network bound.",
                  query:
                    '(avg by (instance) (rate(node_cpu_seconds_total{mode="iowait"}[5m])) * 100 > 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  content:
                    '- alert: HostCpuHighIowait\r\n      expr: \'(avg by (instance) (rate(node_cpu_seconds_total{mode="iowait"}[5m])) * 100 > 10) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host CPU high iowait (instance {{ $labels.instance }})\r\n        description: "CPU iowait > 10%. A high iowait means that you are disk or network bound.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host unusual disk IO",
                  description:
                    "Time spent in IO is too high on {{ $labels.instance }}. Check storage for issues.",
                  query:
                    '(rate(node_disk_io_time_seconds_total[1m]) > 0.5) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostUnusualDiskIo\r\n      expr: \'(rate(node_disk_io_time_seconds_total[1m]) > 0.5) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host unusual disk IO (instance {{ $labels.instance }})\r\n        description: "Time spent in IO is too high on {{ $labels.instance }}. Check storage for issues.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host context switching high",
                  description:
                    "Context switching is growing on the node (twice the daily average during the last 15m)",
                  query:
                    '(rate(node_context_switches_total[15m])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"}))\n/\n(rate(node_context_switches_total[1d])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"})) > 2\n',
                  severity: "warning",
                  comments:
                    "x2 context switches is an arbitrary number.\nThe alert threshold depends on the nature of the application.\nPlease read: https://github.com/samber/awesome-prometheus-alerts/issues/58\n",
                  content:
                    '# x2 context switches is an arbitrary number.\nThe alert threshold depends on the nature of the application.\nPlease read: https://github.com/samber/awesome-prometheus-alerts/issues/58\r\n    - alert: HostContextSwitchingHigh\r\n      expr: \'(rate(node_context_switches_total[15m])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"}))\n/\n(rate(node_context_switches_total[1d])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"})) > 2\n\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host context switching high (instance {{ $labels.instance }})\r\n        description: "Context switching is growing on the node (twice the daily average during the last 15m)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host swap is filling up",
                  description: "Swap is filling up (>80%)",
                  query:
                    '((1 - (node_memory_SwapFree_bytes / node_memory_SwapTotal_bytes)) * 100 > 80) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostSwapIsFillingUp\r\n      expr: \'((1 - (node_memory_SwapFree_bytes / node_memory_SwapTotal_bytes)) * 100 > 80) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host swap is filling up (instance {{ $labels.instance }})\r\n        description: "Swap is filling up (>80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host systemd service crashed",
                  description: "systemd service crashed",
                  query:
                    '(node_systemd_unit_state{state="failed"} == 1) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  content:
                    '- alert: HostSystemdServiceCrashed\r\n      expr: \'(node_systemd_unit_state{state="failed"} == 1) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host systemd service crashed (instance {{ $labels.instance }})\r\n        description: "systemd service crashed\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host physical component too hot",
                  description: "Physical hardware component too hot",
                  query:
                    '((node_hwmon_temp_celsius * ignoring(label) group_left(instance, job, node, sensor) node_hwmon_sensor_label{label!="tctl"} > 75)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostPhysicalComponentTooHot\r\n      expr: \'((node_hwmon_temp_celsius * ignoring(label) group_left(instance, job, node, sensor) node_hwmon_sensor_label{label!="tctl"} > 75)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host physical component too hot (instance {{ $labels.instance }})\r\n        description: "Physical hardware component too hot\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host node overtemperature alarm",
                  description: "Physical node temperature alarm triggered",
                  query:
                    '((node_hwmon_temp_crit_alarm_celsius == 1) or (node_hwmon_temp_alarm == 1)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "critical",
                  content:
                    '- alert: HostNodeOvertemperatureAlarm\r\n      expr: \'((node_hwmon_temp_crit_alarm_celsius == 1) or (node_hwmon_temp_alarm == 1)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Host node overtemperature alarm (instance {{ $labels.instance }})\r\n        description: "Physical node temperature alarm triggered\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host RAID array got inactive",
                  description:
                    "RAID array {{ $labels.device }} is in a degraded state due to one or more disk failures. The number of spare drives is insufficient to fix the issue automatically.",
                  query:
                    '(node_md_state{state="inactive"} > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "critical",
                  content:
                    '- alert: HostRaidArrayGotInactive\r\n      expr: \'(node_md_state{state="inactive"} > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Host RAID array got inactive (instance {{ $labels.instance }})\r\n        description: "RAID array {{ $labels.device }} is in a degraded state due to one or more disk failures. The number of spare drives is insufficient to fix the issue automatically.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host RAID disk failure",
                  description:
                    "At least one device in RAID array on {{ $labels.instance }} failed. Array {{ $labels.md_device }} needs attention and possibly a disk swap",
                  query:
                    '(node_md_disks{state="failed"} > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostRaidDiskFailure\r\n      expr: \'(node_md_disks{state="failed"} > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host RAID disk failure (instance {{ $labels.instance }})\r\n        description: "At least one device in RAID array on {{ $labels.instance }} failed. Array {{ $labels.md_device }} needs attention and possibly a disk swap\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host kernel version deviations",
                  description: "Different kernel versions are running",
                  query:
                    '(count(sum(label_replace(node_uname_info, "kernel", "$1", "release", "([0-9]+.[0-9]+.[0-9]+).*")) by (kernel)) > 1) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "6h",
                  content:
                    '- alert: HostKernelVersionDeviations\r\n      expr: \'(count(sum(label_replace(node_uname_info, "kernel", "$1", "release", "([0-9]+.[0-9]+.[0-9]+).*")) by (kernel)) > 1) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 6h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host kernel version deviations (instance {{ $labels.instance }})\r\n        description: "Different kernel versions are running\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host OOM kill detected",
                  description: "OOM kill detected",
                  query:
                    '(increase(node_vmstat_oom_kill[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  content:
                    '- alert: HostOomKillDetected\r\n      expr: \'(increase(node_vmstat_oom_kill[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host OOM kill detected (instance {{ $labels.instance }})\r\n        description: "OOM kill detected\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host EDAC Correctable Errors detected",
                  description:
                    'Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} correctable memory errors reported by EDAC in the last 5 minutes.',
                  query:
                    '(increase(node_edac_correctable_errors_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "info",
                  content:
                    '- alert: HostEdacCorrectableErrorsDetected\r\n      expr: \'(increase(node_edac_correctable_errors_total[1m]) > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Host EDAC Correctable Errors detected (instance {{ $labels.instance }})\r\n        description: "Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} correctable memory errors reported by EDAC in the last 5 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host EDAC Uncorrectable Errors detected",
                  description:
                    'Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} uncorrectable memory errors reported by EDAC in the last 5 minutes.',
                  query:
                    '(node_edac_uncorrectable_errors_total > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  content:
                    '- alert: HostEdacUncorrectableErrorsDetected\r\n      expr: \'(node_edac_uncorrectable_errors_total > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host EDAC Uncorrectable Errors detected (instance {{ $labels.instance }})\r\n        description: "Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} uncorrectable memory errors reported by EDAC in the last 5 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host Network Receive Errors",
                  description:
                    'Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} receive errors in the last two minutes.',
                  query:
                    '(rate(node_network_receive_errs_total[2m]) / rate(node_network_receive_packets_total[2m]) > 0.01) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostNetworkReceiveErrors\r\n      expr: \'(rate(node_network_receive_errs_total[2m]) / rate(node_network_receive_packets_total[2m]) > 0.01) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host Network Receive Errors (instance {{ $labels.instance }})\r\n        description: "Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} receive errors in the last two minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host Network Transmit Errors",
                  description:
                    'Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} transmit errors in the last two minutes.',
                  query:
                    '(rate(node_network_transmit_errs_total[2m]) / rate(node_network_transmit_packets_total[2m]) > 0.01) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostNetworkTransmitErrors\r\n      expr: \'(rate(node_network_transmit_errs_total[2m]) / rate(node_network_transmit_packets_total[2m]) > 0.01) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host Network Transmit Errors (instance {{ $labels.instance }})\r\n        description: "Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} transmit errors in the last two minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host Network Interface Saturated",
                  description:
                    'The network interface "{{ $labels.device }}" on "{{ $labels.instance }}" is getting overloaded.',
                  query:
                    '((rate(node_network_receive_bytes_total{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"}[1m]) + rate(node_network_transmit_bytes_total{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"}[1m])) / node_network_speed_bytes{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"} > 0.8 < 10000) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: HostNetworkInterfaceSaturated\r\n      expr: \'((rate(node_network_receive_bytes_total{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"}[1m]) + rate(node_network_transmit_bytes_total{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"}[1m])) / node_network_speed_bytes{device!~"^tap.*|^vnet.*|^veth.*|^tun.*"} > 0.8 < 10000) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host Network Interface Saturated (instance {{ $labels.instance }})\r\n        description: "The network interface "{{ $labels.device }}" on "{{ $labels.instance }}" is getting overloaded.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host Network Bond Degraded",
                  description:
                    'Bond "{{ $labels.device }}" degraded on "{{ $labels.instance }}".',
                  query:
                    '((node_bonding_active - node_bonding_slaves) != 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostNetworkBondDegraded\r\n      expr: \'((node_bonding_active - node_bonding_slaves) != 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host Network Bond Degraded (instance {{ $labels.instance }})\r\n        description: "Bond "{{ $labels.device }}" degraded on "{{ $labels.instance }}".\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host conntrack limit",
                  description: "The number of conntrack is approaching limit",
                  query:
                    '(node_nf_conntrack_entries / node_nf_conntrack_entries_limit > 0.8) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostConntrackLimit\r\n      expr: \'(node_nf_conntrack_entries / node_nf_conntrack_entries_limit > 0.8) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host conntrack limit (instance {{ $labels.instance }})\r\n        description: "The number of conntrack is approaching limit\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host clock skew",
                  description:
                    "Clock skew detected. Clock is out of sync. Ensure NTP is configured correctly on this host.",
                  query:
                    '((node_timex_offset_seconds > 0.05 and deriv(node_timex_offset_seconds[5m]) >= 0) or (node_timex_offset_seconds < -0.05 and deriv(node_timex_offset_seconds[5m]) <= 0)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "10m",
                  content:
                    '- alert: HostClockSkew\r\n      expr: \'((node_timex_offset_seconds > 0.05 and deriv(node_timex_offset_seconds[5m]) >= 0) or (node_timex_offset_seconds < -0.05 and deriv(node_timex_offset_seconds[5m]) <= 0)) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host clock skew (instance {{ $labels.instance }})\r\n        description: "Clock skew detected. Clock is out of sync. Ensure NTP is configured correctly on this host.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host clock not synchronising",
                  description:
                    "Clock not synchronising. Ensure NTP is configured on this host.",
                  query:
                    '(min_over_time(node_timex_sync_status[1m]) == 0 and node_timex_maxerror_seconds >= 16) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HostClockNotSynchronising\r\n      expr: \'(min_over_time(node_timex_sync_status[1m]) == 0 and node_timex_maxerror_seconds >= 16) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host clock not synchronising (instance {{ $labels.instance }})\r\n        description: "Clock not synchronising. Ensure NTP is configured on this host.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host requires reboot",
                  description: "{{ $labels.instance }} requires a reboot.",
                  query:
                    '(node_reboot_required > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}',
                  severity: "info",
                  for: "4h",
                  content:
                    '- alert: HostRequiresReboot\r\n      expr: \'(node_reboot_required > 0) * on(instance) group_left (nodename) node_uname_info{nodename=~".+"}\'\r\n      for: 4h\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Host requires reboot (instance {{ $labels.instance }})\r\n        description: "{{ $labels.instance }} requires a reboot.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "S.M.A.R.T Device Monitoring",
          exporters: [
            {
              name: "smartctl-exporter",
              slug: "smartctl-exporter",
              doc_url:
                "https://github.com/prometheus-community/smartctl_exporter",
              rules: [
                {
                  name: "Smart device temperature warning",
                  description:
                    "Device temperature  warning (instance {{ $labels.instance }})",
                  query: "smartctl_device_temperature > 60",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: SmartDeviceTemperatureWarning\r\n      expr: 'smartctl_device_temperature > 60'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Smart device temperature warning (instance {{ $labels.instance }})\r\n        description: \"Device temperature  warning (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Smart device temperature critical",
                  description:
                    "Device temperature critical  (instance {{ $labels.instance }})",
                  query: "smartctl_device_temperature > 80",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: SmartDeviceTemperatureCritical\r\n      expr: 'smartctl_device_temperature > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Smart device temperature critical (instance {{ $labels.instance }})\r\n        description: \"Device temperature critical  (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Smart critical warning",
                  description:
                    "device has critical warning (instance {{ $labels.instance }})",
                  query: "smartctl_device_critical_warning > 0",
                  severity: "critical",
                  for: "15m",
                  content:
                    "- alert: SmartCriticalWarning\r\n      expr: 'smartctl_device_critical_warning > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Smart critical warning (instance {{ $labels.instance }})\r\n        description: \"device has critical warning (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Smart media errors",
                  description:
                    "device has media errors (instance {{ $labels.instance }})",
                  query: "smartctl_device_media_errors > 0",
                  severity: "critical",
                  for: "15m",
                  content:
                    "- alert: SmartMediaErrors\r\n      expr: 'smartctl_device_media_errors > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Smart media errors (instance {{ $labels.instance }})\r\n        description: \"device has media errors (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Smart NVME Wearout Indicator",
                  description:
                    "NVMe device is wearing out (instance {{ $labels.instance }})",
                  query:
                    'smartctl_device_available_spare{device=~"nvme.*"} < smartctl_device_available_spare_threshold{device=~"nvme.*"}',
                  severity: "critical",
                  for: "15m",
                  content:
                    '- alert: SmartNvmeWearoutIndicator\r\n      expr: \'smartctl_device_available_spare{device=~"nvme.*"} < smartctl_device_available_spare_threshold{device=~"nvme.*"}\'\r\n      for: 15m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Smart NVME Wearout Indicator (instance {{ $labels.instance }})\r\n        description: "NVMe device is wearing out (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Docker containers",
          exporters: [
            {
              name: "google/cAdvisor",
              slug: "google-cadvisor",
              doc_url: "https://github.com/google/cadvisor",
              rules: [
                {
                  name: "Container killed",
                  description: "A container has disappeared",
                  query: "time() - container_last_seen > 60",
                  severity: "warning",
                  comments:
                    "This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.\n",
                  content:
                    "# This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.\r\n    - alert: ContainerKilled\r\n      expr: 'time() - container_last_seen > 60'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container killed (instance {{ $labels.instance }})\r\n        description: \"A container has disappeared\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Container absent",
                  description: "A container is absent for 5 min",
                  query: "absent(container_last_seen)",
                  severity: "warning",
                  for: "5m",
                  comments:
                    "This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.\n",
                  content:
                    "# This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.\r\n    - alert: ContainerAbsent\r\n      expr: 'absent(container_last_seen)'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container absent (instance {{ $labels.instance }})\r\n        description: \"A container is absent for 5 min\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Container High CPU utilization",
                  description: "Container CPU utilization is above 80%",
                  query:
                    '(sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod, container) / sum(container_spec_cpu_quota{container!=""}/container_spec_cpu_period{container!=""}) by (pod, container) * 100) > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: ContainerHighCpuUtilization\r\n      expr: \'(sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod, container) / sum(container_spec_cpu_quota{container!=""}/container_spec_cpu_period{container!=""}) by (pod, container) * 100) > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container High CPU utilization (instance {{ $labels.instance }})\r\n        description: "Container CPU utilization is above 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Container High Memory usage",
                  description: "Container Memory usage is above 80%",
                  query:
                    '(sum(container_memory_working_set_bytes{name!=""}) BY (instance, name) / sum(container_spec_memory_limit_bytes > 0) BY (instance, name) * 100) > 80',
                  severity: "warning",
                  comments:
                    "See https://medium.com/faun/how-much-is-too-much-the-linux-oomkiller-and-used-memory-d32186f29c9d",
                  for: "2m",
                  content:
                    '# See https://medium.com/faun/how-much-is-too-much-the-linux-oomkiller-and-used-memory-d32186f29c9d\r\n    - alert: ContainerHighMemoryUsage\r\n      expr: \'(sum(container_memory_working_set_bytes{name!=""}) BY (instance, name) / sum(container_spec_memory_limit_bytes > 0) BY (instance, name) * 100) > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container High Memory usage (instance {{ $labels.instance }})\r\n        description: "Container Memory usage is above 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Container Volume usage",
                  description: "Container Volume usage is above 80%",
                  query:
                    '(1 - (sum(container_fs_inodes_free{name!=""}) BY (instance) / sum(container_fs_inodes_total) BY (instance))) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: ContainerVolumeUsage\r\n      expr: \'(1 - (sum(container_fs_inodes_free{name!=""}) BY (instance) / sum(container_fs_inodes_total) BY (instance))) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container Volume usage (instance {{ $labels.instance }})\r\n        description: "Container Volume usage is above 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Container high throttle rate",
                  description: "Container is being throttled",
                  query:
                    'sum(increase(container_cpu_cfs_throttled_periods_total{container!=""}[5m])) by (container, pod, namespace) / sum(increase(container_cpu_cfs_periods_total[5m])) by (container, pod, namespace) > ( 25 / 100 )',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ContainerHighThrottleRate\r\n      expr: \'sum(increase(container_cpu_cfs_throttled_periods_total{container!=""}[5m])) by (container, pod, namespace) / sum(increase(container_cpu_cfs_periods_total[5m])) by (container, pod, namespace) > ( 25 / 100 )\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Container high throttle rate (instance {{ $labels.instance }})\r\n        description: "Container is being throttled\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Container Low CPU utilization",
                  description:
                    "Container CPU utilization is under 20% for 1 week. Consider reducing the allocated CPU.",
                  query:
                    '(sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod, container) / sum(container_spec_cpu_quota{container!=""}/container_spec_cpu_period{container!=""}) by (pod, container) * 100) < 20',
                  severity: "info",
                  for: "7d",
                  content:
                    '- alert: ContainerLowCpuUtilization\r\n      expr: \'(sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod, container) / sum(container_spec_cpu_quota{container!=""}/container_spec_cpu_period{container!=""}) by (pod, container) * 100) < 20\'\r\n      for: 7d\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Container Low CPU utilization (instance {{ $labels.instance }})\r\n        description: "Container CPU utilization is under 20% for 1 week. Consider reducing the allocated CPU.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Container Low Memory usage",
                  description:
                    "Container Memory usage is under 20% for 1 week. Consider reducing the allocated memory.",
                  query:
                    '(sum(container_memory_working_set_bytes{name!=""}) BY (instance, name) / sum(container_spec_memory_limit_bytes > 0) BY (instance, name) * 100) < 20',
                  severity: "info",
                  for: "7d",
                  content:
                    '- alert: ContainerLowMemoryUsage\r\n      expr: \'(sum(container_memory_working_set_bytes{name!=""}) BY (instance, name) / sum(container_spec_memory_limit_bytes > 0) BY (instance, name) * 100) < 20\'\r\n      for: 7d\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Container Low Memory usage (instance {{ $labels.instance }})\r\n        description: "Container Memory usage is under 20% for 1 week. Consider reducing the allocated memory.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Blackbox",
          exporters: [
            {
              name: "prometheus/blackbox_exporter",
              slug: "blackbox-exporter",
              doc_url: "https://github.com/prometheus/blackbox_exporter",
              rules: [
                {
                  name: "Blackbox probe failed",
                  description: "Probe failed",
                  query: "probe_success == 0",
                  severity: "critical",
                  content:
                    "- alert: BlackboxProbeFailed\r\n      expr: 'probe_success == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Blackbox probe failed (instance {{ $labels.instance }})\r\n        description: \"Probe failed\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox configuration reload failure",
                  description: "Blackbox configuration reload failure",
                  query: "blackbox_exporter_config_last_reload_successful != 1",
                  severity: "warning",
                  content:
                    "- alert: BlackboxConfigurationReloadFailure\r\n      expr: 'blackbox_exporter_config_last_reload_successful != 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Blackbox configuration reload failure (instance {{ $labels.instance }})\r\n        description: \"Blackbox configuration reload failure\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox slow probe",
                  description: "Blackbox probe took more than 1s to complete",
                  query: "avg_over_time(probe_duration_seconds[1m]) > 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: BlackboxSlowProbe\r\n      expr: 'avg_over_time(probe_duration_seconds[1m]) > 1'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Blackbox slow probe (instance {{ $labels.instance }})\r\n        description: \"Blackbox probe took more than 1s to complete\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox probe HTTP failure",
                  description: "HTTP status code is not 200-399",
                  query:
                    "probe_http_status_code <= 199 OR probe_http_status_code >= 400",
                  severity: "critical",
                  content:
                    "- alert: BlackboxProbeHttpFailure\r\n      expr: 'probe_http_status_code <= 199 OR probe_http_status_code >= 400'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Blackbox probe HTTP failure (instance {{ $labels.instance }})\r\n        description: \"HTTP status code is not 200-399\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox SSL certificate will expire soon",
                  description: "SSL certificate expires in less than 20 days",
                  query:
                    "3 <= round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 20",
                  severity: "warning",
                  content:
                    "- alert: BlackboxSslCertificateWillExpireSoon\r\n      expr: '3 <= round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 20'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})\r\n        description: \"SSL certificate expires in less than 20 days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox SSL certificate will expire soon",
                  description: "SSL certificate expires in less than 3 days",
                  query:
                    "0 <= round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 3",
                  severity: "critical",
                  content:
                    "- alert: BlackboxSslCertificateWillExpireSoon\r\n      expr: '0 <= round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})\r\n        description: \"SSL certificate expires in less than 3 days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox SSL certificate expired",
                  description: "SSL certificate has expired already",
                  query:
                    "round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 0",
                  severity: "critical",
                  comments:
                    "For probe_ssl_earliest_cert_expiry to be exposed after expiration, you\nneed to enable insecure_skip_verify. Note that this will disable\ncertificate validation.\nSee https://github.com/prometheus/blackbox_exporter/blob/master/CONFIGURATION.md#tls_config\n",
                  content:
                    "# For probe_ssl_earliest_cert_expiry to be exposed after expiration, you\nneed to enable insecure_skip_verify. Note that this will disable\ncertificate validation.\nSee https://github.com/prometheus/blackbox_exporter/blob/master/CONFIGURATION.md#tls_config\r\n    - alert: BlackboxSslCertificateExpired\r\n      expr: 'round((last_over_time(probe_ssl_earliest_cert_expiry[10m]) - time()) / 86400, 0.1) < 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Blackbox SSL certificate expired (instance {{ $labels.instance }})\r\n        description: \"SSL certificate has expired already\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox probe slow HTTP",
                  description: "HTTP request took more than 1s",
                  query: "avg_over_time(probe_http_duration_seconds[1m]) > 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: BlackboxProbeSlowHttp\r\n      expr: 'avg_over_time(probe_http_duration_seconds[1m]) > 1'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Blackbox probe slow HTTP (instance {{ $labels.instance }})\r\n        description: \"HTTP request took more than 1s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Blackbox probe slow ping",
                  description: "Blackbox ping took more than 1s",
                  query: "avg_over_time(probe_icmp_duration_seconds[1m]) > 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: BlackboxProbeSlowPing\r\n      expr: 'avg_over_time(probe_icmp_duration_seconds[1m]) > 1'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Blackbox probe slow ping (instance {{ $labels.instance }})\r\n        description: \"Blackbox ping took more than 1s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Windows Server",
          exporters: [
            {
              name: "prometheus-community/windows_exporter",
              slug: "windows-exporter",
              doc_url:
                "https://github.com/prometheus-community/windows_exporter",
              rules: [
                {
                  name: "Windows Server collector Error",
                  description:
                    "Collector {{ $labels.collector }} was not successful",
                  query: "windows_exporter_collector_success == 0",
                  severity: "critical",
                  content:
                    "- alert: WindowsServerCollectorError\r\n      expr: 'windows_exporter_collector_success == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Windows Server collector Error (instance {{ $labels.instance }})\r\n        description: \"Collector {{ $labels.collector }} was not successful\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Windows Server service Status",
                  description: "Windows Service state is not OK",
                  query: 'windows_service_status{status="ok"} != 1',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: WindowsServerServiceStatus\r\n      expr: \'windows_service_status{status="ok"} != 1\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Windows Server service Status (instance {{ $labels.instance }})\r\n        description: "Windows Service state is not OK\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Windows Server CPU Usage",
                  description: "CPU Usage is more than 80%",
                  query:
                    '100 - (avg by (instance) (rate(windows_cpu_time_total{mode="idle"}[2m])) * 100) > 80',
                  severity: "warning",
                  content:
                    '- alert: WindowsServerCpuUsage\r\n      expr: \'100 - (avg by (instance) (rate(windows_cpu_time_total{mode="idle"}[2m])) * 100) > 80\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Windows Server CPU Usage (instance {{ $labels.instance }})\r\n        description: "CPU Usage is more than 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Windows Server memory Usage",
                  description: "Memory usage is more than 90%",
                  query:
                    "100 - ((windows_os_physical_memory_free_bytes / windows_cs_physical_memory_bytes) * 100) > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: WindowsServerMemoryUsage\r\n      expr: '100 - ((windows_os_physical_memory_free_bytes / windows_cs_physical_memory_bytes) * 100) > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Windows Server memory Usage (instance {{ $labels.instance }})\r\n        description: \"Memory usage is more than 90%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Windows Server disk Space Usage",
                  description: "Disk usage is more than 80%",
                  query:
                    "100.0 - 100 * ((windows_logical_disk_free_bytes / 1024 / 1024 ) / (windows_logical_disk_size_bytes / 1024 / 1024)) > 80",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: WindowsServerDiskSpaceUsage\r\n      expr: '100.0 - 100 * ((windows_logical_disk_free_bytes / 1024 / 1024 ) / (windows_logical_disk_size_bytes / 1024 / 1024)) > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Windows Server disk Space Usage (instance {{ $labels.instance }})\r\n        description: \"Disk usage is more than 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "VMware",
          exporters: [
            {
              name: "pryorda/vmware_exporter",
              slug: "pryorda-vmware-exporter",
              doc_url: "https://github.com/pryorda/vmware_exporter",
              rules: [
                {
                  name: "Virtual Machine Memory Warning",
                  description:
                    'High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query:
                    "vmware_vm_mem_usage_average / 100 >= 80 and vmware_vm_mem_usage_average / 100 < 90",
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: VirtualMachineMemoryWarning\r\n      expr: \'vmware_vm_mem_usage_average / 100 >= 80 and vmware_vm_mem_usage_average / 100 < 90\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Virtual Machine Memory Warning (instance {{ $labels.instance }})\r\n        description: "High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Virtual Machine Memory Critical",
                  description:
                    'High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query: "vmware_vm_mem_usage_average / 100 >= 90",
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: VirtualMachineMemoryCritical\r\n      expr: \'vmware_vm_mem_usage_average / 100 >= 90\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Virtual Machine Memory Critical (instance {{ $labels.instance }})\r\n        description: "High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "High Number of Snapshots",
                  description:
                    "High snapshots number on {{ $labels.instance }}: {{ $value }}",
                  query: "vmware_vm_snapshots > 3",
                  severity: "warning",
                  for: "30m",
                  content:
                    "- alert: HighNumberOfSnapshots\r\n      expr: 'vmware_vm_snapshots > 3'\r\n      for: 30m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: High Number of Snapshots (instance {{ $labels.instance }})\r\n        description: \"High snapshots number on {{ $labels.instance }}: {{ $value }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Outdated Snapshots",
                  description:
                    'Outdated snapshots on {{ $labels.instance }}: {{ $value | printf "%.0f"}} days',
                  query:
                    "(time() - vmware_vm_snapshot_timestamp_seconds) / (60 * 60 * 24) >= 3",
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: OutdatedSnapshots\r\n      expr: \'(time() - vmware_vm_snapshot_timestamp_seconds) / (60 * 60 * 24) >= 3\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Outdated Snapshots (instance {{ $labels.instance }})\r\n        description: "Outdated snapshots on {{ $labels.instance }}: {{ $value | printf "%.0f"}} days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Netdata",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://github.com/netdata/netdata/blob/master/backends/prometheus/README.md",
              rules: [
                {
                  name: "Netdata high cpu usage",
                  description: "Netdata high CPU usage (> 80%)",
                  query:
                    'rate(netdata_cpu_cpu_percentage_average{dimension="idle"}[1m]) > 80',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: NetdataHighCpuUsage\r\n      expr: \'rate(netdata_cpu_cpu_percentage_average{dimension="idle"}[1m]) > 80\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata high cpu usage (instance {{ $labels.instance }})\r\n        description: "Netdata high CPU usage (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Host CPU steal noisy neighbor",
                  description:
                    "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.",
                  query:
                    'rate(netdata_cpu_cpu_percentage_average{dimension="steal"}[1m]) > 10',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: HostCpuStealNoisyNeighbor\r\n      expr: \'rate(netdata_cpu_cpu_percentage_average{dimension="steal"}[1m]) > 10\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Host CPU steal noisy neighbor (instance {{ $labels.instance }})\r\n        description: "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Netdata high memory usage",
                  description: "Netdata high memory usage (> 80%)",
                  query:
                    '100 / netdata_system_ram_MB_average * netdata_system_ram_MB_average{dimension=~"free|cached"} < 20',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: NetdataHighMemoryUsage\r\n      expr: \'100 / netdata_system_ram_MB_average * netdata_system_ram_MB_average{dimension=~"free|cached"} < 20\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata high memory usage (instance {{ $labels.instance }})\r\n        description: "Netdata high memory usage (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Netdata low disk space",
                  description: "Netdata low disk space (> 80%)",
                  query:
                    '100 / netdata_disk_space_GB_average * netdata_disk_space_GB_average{dimension=~"avail|cached"} < 20',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: NetdataLowDiskSpace\r\n      expr: \'100 / netdata_disk_space_GB_average * netdata_disk_space_GB_average{dimension=~"avail|cached"} < 20\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata low disk space (instance {{ $labels.instance }})\r\n        description: "Netdata low disk space (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Netdata predicted disk full",
                  description: "Netdata predicted disk full in 24 hours",
                  query:
                    'predict_linear(netdata_disk_space_GB_average{dimension=~"avail|cached"}[3h], 24 * 3600) < 0',
                  severity: "warning",
                  content:
                    '- alert: NetdataPredictedDiskFull\r\n      expr: \'predict_linear(netdata_disk_space_GB_average{dimension=~"avail|cached"}[3h], 24 * 3600) < 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata predicted disk full (instance {{ $labels.instance }})\r\n        description: "Netdata predicted disk full in 24 hours\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Netdata MD mismatch cnt unsynchronized blocks",
                  description: "RAID Array have unsynchronized blocks",
                  query:
                    "netdata_md_mismatch_cnt_unsynchronized_blocks_average > 1024",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: NetdataMdMismatchCntUnsynchronizedBlocks\r\n      expr: 'netdata_md_mismatch_cnt_unsynchronized_blocks_average > 1024'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata MD mismatch cnt unsynchronized blocks (instance {{ $labels.instance }})\r\n        description: \"RAID Array have unsynchronized blocks\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Netdata disk reallocated sectors",
                  description: "Reallocated sectors on disk",
                  query:
                    "increase(netdata_smartd_log_reallocated_sectors_count_sectors_average[1m]) > 0",
                  severity: "info",
                  content:
                    "- alert: NetdataDiskReallocatedSectors\r\n      expr: 'increase(netdata_smartd_log_reallocated_sectors_count_sectors_average[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Netdata disk reallocated sectors (instance {{ $labels.instance }})\r\n        description: \"Reallocated sectors on disk\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Netdata disk current pending sector",
                  description: "Disk current pending sector",
                  query:
                    "netdata_smartd_log_current_pending_sector_count_sectors_average > 0",
                  severity: "warning",
                  content:
                    "- alert: NetdataDiskCurrentPendingSector\r\n      expr: 'netdata_smartd_log_current_pending_sector_count_sectors_average > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata disk current pending sector (instance {{ $labels.instance }})\r\n        description: \"Disk current pending sector\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Netdata reported uncorrectable disk sectors",
                  description: "Reported uncorrectable disk sectors",
                  query:
                    "increase(netdata_smartd_log_offline_uncorrectable_sector_count_sectors_average[2m]) > 0",
                  severity: "warning",
                  content:
                    "- alert: NetdataReportedUncorrectableDiskSectors\r\n      expr: 'increase(netdata_smartd_log_offline_uncorrectable_sector_count_sectors_average[2m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Netdata reported uncorrectable disk sectors (instance {{ $labels.instance }})\r\n        description: \"Reported uncorrectable disk sectors\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Databases and brokers",
      services: [
        {
          name: "MySQL",
          exporters: [
            {
              name: "prometheus/mysqld_exporter",
              slug: "mysqld-exporter",
              doc_url: "https://github.com/prometheus/mysqld_exporter",
              rules: [
                {
                  name: "MySQL down",
                  description:
                    "MySQL instance is down on {{ $labels.instance }}",
                  query: "mysql_up == 0",
                  severity: "critical",
                  content:
                    "- alert: MysqlDown\r\n      expr: 'mysql_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MySQL down (instance {{ $labels.instance }})\r\n        description: \"MySQL instance is down on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL too many connections (> 80%)",
                  description:
                    "More than 80% of MySQL connections are in use on {{ $labels.instance }}",
                  query:
                    "max_over_time(mysql_global_status_threads_connected[1m]) / mysql_global_variables_max_connections * 100 > 80",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MysqlTooManyConnections(>80%)\r\n      expr: 'max_over_time(mysql_global_status_threads_connected[1m]) / mysql_global_variables_max_connections * 100 > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MySQL too many connections (> 80%) (instance {{ $labels.instance }})\r\n        description: \"More than 80% of MySQL connections are in use on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL high prepared statements utilization (> 80%)",
                  description:
                    "High utilization of prepared statements (>80%) on {{ $labels.instance }}",
                  query:
                    "max_over_time(mysql_global_status_prepared_stmt_count[1m]) / mysql_global_variables_max_prepared_stmt_count * 100 > 80",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MysqlHighPreparedStatementsUtilization(>80%)\r\n      expr: 'max_over_time(mysql_global_status_prepared_stmt_count[1m]) / mysql_global_variables_max_prepared_stmt_count * 100 > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MySQL high prepared statements utilization (> 80%) (instance {{ $labels.instance }})\r\n        description: \"High utilization of prepared statements (>80%) on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL high threads running",
                  description:
                    "More than 60% of MySQL connections are in running state on {{ $labels.instance }}",
                  query:
                    "max_over_time(mysql_global_status_threads_running[1m]) / mysql_global_variables_max_connections * 100 > 60",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MysqlHighThreadsRunning\r\n      expr: 'max_over_time(mysql_global_status_threads_running[1m]) / mysql_global_variables_max_connections * 100 > 60'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MySQL high threads running (instance {{ $labels.instance }})\r\n        description: \"More than 60% of MySQL connections are in running state on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL Slave IO thread not running",
                  description:
                    "MySQL Slave IO thread not running on {{ $labels.instance }}",
                  query:
                    "( mysql_slave_status_slave_io_running and ON (instance) mysql_slave_status_master_server_id > 0 ) == 0",
                  severity: "critical",
                  content:
                    "- alert: MysqlSlaveIoThreadNotRunning\r\n      expr: '( mysql_slave_status_slave_io_running and ON (instance) mysql_slave_status_master_server_id > 0 ) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MySQL Slave IO thread not running (instance {{ $labels.instance }})\r\n        description: \"MySQL Slave IO thread not running on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL Slave SQL thread not running",
                  description:
                    "MySQL Slave SQL thread not running on {{ $labels.instance }}",
                  query:
                    "( mysql_slave_status_slave_sql_running and ON (instance) mysql_slave_status_master_server_id > 0) == 0",
                  severity: "critical",
                  content:
                    "- alert: MysqlSlaveSqlThreadNotRunning\r\n      expr: '( mysql_slave_status_slave_sql_running and ON (instance) mysql_slave_status_master_server_id > 0) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MySQL Slave SQL thread not running (instance {{ $labels.instance }})\r\n        description: \"MySQL Slave SQL thread not running on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL Slave replication lag",
                  description:
                    "MySQL replication lag on {{ $labels.instance }}",
                  query:
                    "( (mysql_slave_status_seconds_behind_master - mysql_slave_status_sql_delay) and ON (instance) mysql_slave_status_master_server_id > 0 ) > 30",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: MysqlSlaveReplicationLag\r\n      expr: '( (mysql_slave_status_seconds_behind_master - mysql_slave_status_sql_delay) and ON (instance) mysql_slave_status_master_server_id > 0 ) > 30'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MySQL Slave replication lag (instance {{ $labels.instance }})\r\n        description: \"MySQL replication lag on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL slow queries",
                  description: "MySQL server mysql has some new slow query.",
                  query: "increase(mysql_global_status_slow_queries[1m]) > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MysqlSlowQueries\r\n      expr: 'increase(mysql_global_status_slow_queries[1m]) > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MySQL slow queries (instance {{ $labels.instance }})\r\n        description: \"MySQL server mysql has some new slow query.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL InnoDB log waits",
                  description: "MySQL innodb log writes stalling",
                  query: "rate(mysql_global_status_innodb_log_waits[15m]) > 10",
                  severity: "warning",
                  content:
                    "- alert: MysqlInnodbLogWaits\r\n      expr: 'rate(mysql_global_status_innodb_log_waits[15m]) > 10'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MySQL InnoDB log waits (instance {{ $labels.instance }})\r\n        description: \"MySQL innodb log writes stalling\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MySQL restarted",
                  description:
                    "MySQL has just been restarted, less than one minute ago on {{ $labels.instance }}.",
                  query: "mysql_global_status_uptime < 60",
                  severity: "info",
                  content:
                    "- alert: MysqlRestarted\r\n      expr: 'mysql_global_status_uptime < 60'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: MySQL restarted (instance {{ $labels.instance }})\r\n        description: \"MySQL has just been restarted, less than one minute ago on {{ $labels.instance }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "PostgreSQL",
          exporters: [
            {
              name: "prometheus-community/postgres_exporter",
              slug: "postgres-exporter",
              doc_url:
                "https://github.com/prometheus-community/postgres_exporter",
              rules: [
                {
                  name: "Postgresql down",
                  description: "Postgresql instance is down",
                  query: "pg_up == 0",
                  severity: "critical",
                  content:
                    "- alert: PostgresqlDown\r\n      expr: 'pg_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql down (instance {{ $labels.instance }})\r\n        description: \"Postgresql instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql restarted",
                  description: "Postgresql restarted",
                  query: "time() - pg_postmaster_start_time_seconds < 60",
                  severity: "critical",
                  content:
                    "- alert: PostgresqlRestarted\r\n      expr: 'time() - pg_postmaster_start_time_seconds < 60'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql restarted (instance {{ $labels.instance }})\r\n        description: \"Postgresql restarted\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql exporter error",
                  description:
                    "Postgresql exporter is showing errors. A query may be buggy in query.yaml",
                  query: "pg_exporter_last_scrape_error > 0",
                  severity: "critical",
                  content:
                    "- alert: PostgresqlExporterError\r\n      expr: 'pg_exporter_last_scrape_error > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql exporter error (instance {{ $labels.instance }})\r\n        description: \"Postgresql exporter is showing errors. A query may be buggy in query.yaml\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql table not auto vacuumed",
                  description:
                    "Table {{ $labels.relname }} has not been auto vacuumed for 10 days",
                  query:
                    "(pg_stat_user_tables_last_autovacuum > 0) and (time() - pg_stat_user_tables_last_autovacuum) > 60 * 60 * 24 * 10",
                  severity: "warning",
                  content:
                    "- alert: PostgresqlTableNotAutoVacuumed\r\n      expr: '(pg_stat_user_tables_last_autovacuum > 0) and (time() - pg_stat_user_tables_last_autovacuum) > 60 * 60 * 24 * 10'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql table not auto vacuumed (instance {{ $labels.instance }})\r\n        description: \"Table {{ $labels.relname }} has not been auto vacuumed for 10 days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql table not auto analyzed",
                  description:
                    "Table {{ $labels.relname }} has not been auto analyzed for 10 days",
                  query:
                    "(pg_stat_user_tables_last_autoanalyze > 0) and (time() - pg_stat_user_tables_last_autoanalyze) > 24 * 60 * 60 * 10",
                  severity: "warning",
                  content:
                    "- alert: PostgresqlTableNotAutoAnalyzed\r\n      expr: '(pg_stat_user_tables_last_autoanalyze > 0) and (time() - pg_stat_user_tables_last_autoanalyze) > 24 * 60 * 60 * 10'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql table not auto analyzed (instance {{ $labels.instance }})\r\n        description: \"Table {{ $labels.relname }} has not been auto analyzed for 10 days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql too many connections",
                  description:
                    "PostgreSQL instance has too many connections (> 80%).",
                  query:
                    "sum by (instance, job, server) (pg_stat_activity_count) > min by (instance, job, server) (pg_settings_max_connections * 0.8)",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: PostgresqlTooManyConnections\r\n      expr: 'sum by (instance, job, server) (pg_stat_activity_count) > min by (instance, job, server) (pg_settings_max_connections * 0.8)'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql too many connections (instance {{ $labels.instance }})\r\n        description: \"PostgreSQL instance has too many connections (> 80%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql not enough connections",
                  description:
                    "PostgreSQL instance should have more connections (> 5)",
                  query:
                    'sum by (datname) (pg_stat_activity_count{datname!~"template.*|postgres"}) < 5',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: PostgresqlNotEnoughConnections\r\n      expr: \'sum by (datname) (pg_stat_activity_count{datname!~"template.*|postgres"}) < 5\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql not enough connections (instance {{ $labels.instance }})\r\n        description: "PostgreSQL instance should have more connections (> 5)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql dead locks",
                  description: "PostgreSQL has dead-locks",
                  query:
                    'increase(pg_stat_database_deadlocks{datname!~"template.*|postgres"}[1m]) > 5',
                  severity: "warning",
                  content:
                    '- alert: PostgresqlDeadLocks\r\n      expr: \'increase(pg_stat_database_deadlocks{datname!~"template.*|postgres"}[1m]) > 5\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql dead locks (instance {{ $labels.instance }})\r\n        description: "PostgreSQL has dead-locks\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql high rollback rate",
                  description:
                    "Ratio of transactions being aborted compared to committed is > 2 %",
                  query:
                    'sum by (namespace,datname) ((rate(pg_stat_database_xact_rollback{datname!~"template.*|postgres",datid!="0"}[3m])) / ((rate(pg_stat_database_xact_rollback{datname!~"template.*|postgres",datid!="0"}[3m])) + (rate(pg_stat_database_xact_commit{datname!~"template.*|postgres",datid!="0"}[3m])))) > 0.02',
                  severity: "warning",
                  content:
                    '- alert: PostgresqlHighRollbackRate\r\n      expr: \'sum by (namespace,datname) ((rate(pg_stat_database_xact_rollback{datname!~"template.*|postgres",datid!="0"}[3m])) / ((rate(pg_stat_database_xact_rollback{datname!~"template.*|postgres",datid!="0"}[3m])) + (rate(pg_stat_database_xact_commit{datname!~"template.*|postgres",datid!="0"}[3m])))) > 0.02\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql high rollback rate (instance {{ $labels.instance }})\r\n        description: "Ratio of transactions being aborted compared to committed is > 2 %\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql commit rate low",
                  description:
                    "Postgresql seems to be processing very few transactions",
                  query: "rate(pg_stat_database_xact_commit[1m]) < 10",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: PostgresqlCommitRateLow\r\n      expr: 'rate(pg_stat_database_xact_commit[1m]) < 10'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql commit rate low (instance {{ $labels.instance }})\r\n        description: \"Postgresql seems to be processing very few transactions\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql low XID consumption",
                  description:
                    "Postgresql seems to be consuming transaction IDs very slowly",
                  query: "rate(pg_txid_current[1m]) < 5",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: PostgresqlLowXidConsumption\r\n      expr: 'rate(pg_txid_current[1m]) < 5'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql low XID consumption (instance {{ $labels.instance }})\r\n        description: \"Postgresql seems to be consuming transaction IDs very slowly\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql high rate statement timeout",
                  description:
                    "Postgres transactions showing high rate of statement timeouts",
                  query:
                    'rate(postgresql_errors_total{type="statement_timeout"}[1m]) > 3',
                  severity: "critical",
                  content:
                    '- alert: PostgresqlHighRateStatementTimeout\r\n      expr: \'rate(postgresql_errors_total{type="statement_timeout"}[1m]) > 3\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql high rate statement timeout (instance {{ $labels.instance }})\r\n        description: "Postgres transactions showing high rate of statement timeouts\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql high rate deadlock",
                  description: "Postgres detected deadlocks",
                  query:
                    'increase(postgresql_errors_total{type="deadlock_detected"}[1m]) > 1',
                  severity: "critical",
                  content:
                    '- alert: PostgresqlHighRateDeadlock\r\n      expr: \'increase(postgresql_errors_total{type="deadlock_detected"}[1m]) > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql high rate deadlock (instance {{ $labels.instance }})\r\n        description: "Postgres detected deadlocks\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql unused replication slot",
                  description: "Unused Replication Slots",
                  query: "pg_replication_slots_active == 0",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: PostgresqlUnusedReplicationSlot\r\n      expr: 'pg_replication_slots_active == 0'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql unused replication slot (instance {{ $labels.instance }})\r\n        description: \"Unused Replication Slots\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql too many dead tuples",
                  description: "PostgreSQL dead tuples is too large",
                  query:
                    "((pg_stat_user_tables_n_dead_tup > 10000) / (pg_stat_user_tables_n_live_tup + pg_stat_user_tables_n_dead_tup)) >= 0.1",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: PostgresqlTooManyDeadTuples\r\n      expr: '((pg_stat_user_tables_n_dead_tup > 10000) / (pg_stat_user_tables_n_live_tup + pg_stat_user_tables_n_dead_tup)) >= 0.1'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql too many dead tuples (instance {{ $labels.instance }})\r\n        description: \"PostgreSQL dead tuples is too large\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql configuration changed",
                  description:
                    "Postgres Database configuration change has occurred",
                  query:
                    '{__name__=~"pg_settings_.*"} != ON(__name__) {__name__=~"pg_settings_([^t]|t[^r]|tr[^a]|tra[^n]|tran[^s]|trans[^a]|transa[^c]|transac[^t]|transact[^i]|transacti[^o]|transactio[^n]|transaction[^_]|transaction_[^r]|transaction_r[^e]|transaction_re[^a]|transaction_rea[^d]|transaction_read[^_]|transaction_read_[^o]|transaction_read_o[^n]|transaction_read_on[^l]|transaction_read_onl[^y]).*"} OFFSET 5m',
                  severity: "info",
                  content:
                    '- alert: PostgresqlConfigurationChanged\r\n      expr: \'{__name__=~"pg_settings_.*"} != ON(__name__) {__name__=~"pg_settings_([^t]|t[^r]|tr[^a]|tra[^n]|tran[^s]|trans[^a]|transa[^c]|transac[^t]|transact[^i]|transacti[^o]|transactio[^n]|transaction[^_]|transaction_[^r]|transaction_r[^e]|transaction_re[^a]|transaction_rea[^d]|transaction_read[^_]|transaction_read_[^o]|transaction_read_o[^n]|transaction_read_on[^l]|transaction_read_onl[^y]).*"} OFFSET 5m\'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Postgresql configuration changed (instance {{ $labels.instance }})\r\n        description: "Postgres Database configuration change has occurred\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Postgresql SSL compression active",
                  description:
                    "Database connections with SSL compression enabled. This may add significant jitter in replication delay. Replicas should turn off SSL compression via `sslcompression=0` in `recovery.conf`.",
                  query: "sum(pg_stat_ssl_compression) > 0",
                  severity: "critical",
                  content:
                    "- alert: PostgresqlSslCompressionActive\r\n      expr: 'sum(pg_stat_ssl_compression) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql SSL compression active (instance {{ $labels.instance }})\r\n        description: \"Database connections with SSL compression enabled. This may add significant jitter in replication delay. Replicas should turn off SSL compression via `sslcompression=0` in `recovery.conf`.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql too many locks acquired",
                  description:
                    "Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.",
                  query:
                    "((sum (pg_locks_count)) / (pg_settings_max_locks_per_transaction * pg_settings_max_connections)) > 0.20",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: PostgresqlTooManyLocksAcquired\r\n      expr: '((sum (pg_locks_count)) / (pg_settings_max_locks_per_transaction * pg_settings_max_connections)) > 0.20'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Postgresql too many locks acquired (instance {{ $labels.instance }})\r\n        description: \"Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql bloat index high (> 80%)",
                  description:
                    "The index {{ $labels.idxname }} is bloated. You should execute `REINDEX INDEX CONCURRENTLY {{ $labels.idxname }};`",
                  query:
                    "pg_bloat_btree_bloat_pct > 80 and on (idxname) (pg_bloat_btree_real_size > 100000000)",
                  severity: "warning",
                  for: "1h",
                  comments:
                    "See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\n",
                  content:
                    "# See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\r\n    - alert: PostgresqlBloatIndexHigh(>80%)\r\n      expr: 'pg_bloat_btree_bloat_pct > 80 and on (idxname) (pg_bloat_btree_real_size > 100000000)'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql bloat index high (> 80%) (instance {{ $labels.instance }})\r\n        description: \"The index {{ $labels.idxname }} is bloated. You should execute `REINDEX INDEX CONCURRENTLY {{ $labels.idxname }};`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql bloat table high (> 80%)",
                  description:
                    "The table {{ $labels.relname }} is bloated. You should execute `VACUUM {{ $labels.relname }};`",
                  query:
                    "pg_bloat_table_bloat_pct > 80 and on (relname) (pg_bloat_table_real_size > 200000000)",
                  severity: "warning",
                  for: "1h",
                  comments:
                    "See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\n",
                  content:
                    "# See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\r\n    - alert: PostgresqlBloatTableHigh(>80%)\r\n      expr: 'pg_bloat_table_bloat_pct > 80 and on (relname) (pg_bloat_table_real_size > 200000000)'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql bloat table high (> 80%) (instance {{ $labels.instance }})\r\n        description: \"The table {{ $labels.relname }} is bloated. You should execute `VACUUM {{ $labels.relname }};`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Postgresql invalid index",
                  description:
                    "The table {{ $labels.relname }} has an invalid index: {{ $labels.indexrelname }}. You should execute `DROP INDEX {{ $labels.indexrelname }};`",
                  query:
                    'pg_general_index_info_pg_relation_size{indexrelname=~".*ccnew.*"}',
                  severity: "warning",
                  for: "6h",
                  comments:
                    "See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\n",
                  content:
                    '# See https://github.com/samber/awesome-prometheus-alerts/issues/289#issuecomment-1164842737\r\n    - alert: PostgresqlInvalidIndex\r\n      expr: \'pg_general_index_info_pg_relation_size{indexrelname=~".*ccnew.*"}\'\r\n      for: 6h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Postgresql invalid index (instance {{ $labels.instance }})\r\n        description: "The table {{ $labels.relname }} has an invalid index: {{ $labels.indexrelname }}. You should execute `DROP INDEX {{ $labels.indexrelname }};`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "SQL Server",
          exporters: [
            {
              name: "Ozarklake/prometheus-mssql-exporter",
              slug: "ozarklake-mssql-exporter",
              doc_url: "https://github.com/Ozarklake/prometheus-mssql-exporter",
              rules: [
                {
                  name: "SQL Server down",
                  description: "SQL server instance is down",
                  query: "mssql_up == 0",
                  severity: "critical",
                  content:
                    "- alert: SqlServerDown\r\n      expr: 'mssql_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: SQL Server down (instance {{ $labels.instance }})\r\n        description: \"SQL server instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "SQL Server deadlock",
                  description: "SQL Server is having some deadlock.",
                  query: "increase(mssql_deadlocks[1m]) > 5",
                  severity: "warning",
                  content:
                    "- alert: SqlServerDeadlock\r\n      expr: 'increase(mssql_deadlocks[1m]) > 5'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: SQL Server deadlock (instance {{ $labels.instance }})\r\n        description: \"SQL Server is having some deadlock.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Patroni",
          exporters: [
            {
              name: "Embedded exporter (Patroni >= 2.1.0)",
              slug: "embedded-exporter-patroni",
              doc_url:
                "https://patroni.readthedocs.io/en/latest/rest_api.html?highlight=prometheus#monitoring-endpoint",
              rules: [
                {
                  name: "Patroni has no Leader",
                  description:
                    "A leader node (neither primary nor standby) cannot be found inside the cluster {{ $labels.scope }}",
                  query:
                    "(max by (scope) (patroni_master) < 1) and (max by (scope) (patroni_standby_leader) < 1)",
                  severity: "critical",
                  content:
                    "- alert: PatroniHasNoLeader\r\n      expr: '(max by (scope) (patroni_master) < 1) and (max by (scope) (patroni_standby_leader) < 1)'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Patroni has no Leader (instance {{ $labels.instance }})\r\n        description: \"A leader node (neither primary nor standby) cannot be found inside the cluster {{ $labels.scope }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "PGBouncer",
          exporters: [
            {
              name: "spreaker/prometheus-pgbouncer-exporter",
              slug: "spreaker-pgbouncer-exporter",
              doc_url:
                "https://github.com/spreaker/prometheus-pgbouncer-exporter",
              rules: [
                {
                  name: "PGBouncer active connections",
                  description: "PGBouncer pools are filling up",
                  query: "pgbouncer_pools_server_active_connections > 200",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: PgbouncerActiveConnections\r\n      expr: 'pgbouncer_pools_server_active_connections > 200'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: PGBouncer active connections (instance {{ $labels.instance }})\r\n        description: \"PGBouncer pools are filling up\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "PGBouncer errors",
                  description:
                    "PGBouncer is logging errors. This may be due to a a server restart or an admin typing commands at the pgbouncer console.",
                  query:
                    'increase(pgbouncer_errors_count{errmsg!="server conn crashed?"}[1m]) > 10',
                  severity: "warning",
                  content:
                    '- alert: PgbouncerErrors\r\n      expr: \'increase(pgbouncer_errors_count{errmsg!="server conn crashed?"}[1m]) > 10\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: PGBouncer errors (instance {{ $labels.instance }})\r\n        description: "PGBouncer is logging errors. This may be due to a a server restart or an admin typing commands at the pgbouncer console.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "PGBouncer max connections",
                  description:
                    "The number of PGBouncer client connections has reached max_client_conn.",
                  query:
                    'increase(pgbouncer_errors_count{errmsg="no more connections allowed (max_client_conn)"}[30s]) > 0',
                  severity: "critical",
                  content:
                    '- alert: PgbouncerMaxConnections\r\n      expr: \'increase(pgbouncer_errors_count{errmsg="no more connections allowed (max_client_conn)"}[30s]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: PGBouncer max connections (instance {{ $labels.instance }})\r\n        description: "The number of PGBouncer client connections has reached max_client_conn.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Redis",
          exporters: [
            {
              name: "oliver006/redis_exporter",
              slug: "oliver006-redis-exporter",
              doc_url: "https://github.com/oliver006/redis_exporter",
              rules: [
                {
                  name: "Redis down",
                  description: "Redis instance is down",
                  query: "redis_up == 0",
                  severity: "critical",
                  content:
                    "- alert: RedisDown\r\n      expr: 'redis_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis down (instance {{ $labels.instance }})\r\n        description: \"Redis instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis missing master",
                  description: "Redis cluster has no node marked as master.",
                  query:
                    '(count(redis_instance_info{role="master"}) or vector(0)) < 1',
                  severity: "critical",
                  content:
                    '- alert: RedisMissingMaster\r\n      expr: \'(count(redis_instance_info{role="master"}) or vector(0)) < 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis missing master (instance {{ $labels.instance }})\r\n        description: "Redis cluster has no node marked as master.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Redis too many masters",
                  description:
                    "Redis cluster has too many nodes marked as master.",
                  query: 'count(redis_instance_info{role="master"}) > 1',
                  severity: "critical",
                  content:
                    '- alert: RedisTooManyMasters\r\n      expr: \'count(redis_instance_info{role="master"}) > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis too many masters (instance {{ $labels.instance }})\r\n        description: "Redis cluster has too many nodes marked as master.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Redis disconnected slaves",
                  description:
                    "Redis not replicating for all slaves. Consider reviewing the redis replication status.",
                  query:
                    "count without (instance, job) (redis_connected_slaves) - sum without (instance, job) (redis_connected_slaves) - 1 > 0",
                  severity: "critical",
                  content:
                    "- alert: RedisDisconnectedSlaves\r\n      expr: 'count without (instance, job) (redis_connected_slaves) - sum without (instance, job) (redis_connected_slaves) - 1 > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis disconnected slaves (instance {{ $labels.instance }})\r\n        description: \"Redis not replicating for all slaves. Consider reviewing the redis replication status.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis replication broken",
                  description: "Redis instance lost a slave",
                  query: "delta(redis_connected_slaves[1m]) < 0",
                  severity: "critical",
                  content:
                    "- alert: RedisReplicationBroken\r\n      expr: 'delta(redis_connected_slaves[1m]) < 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis replication broken (instance {{ $labels.instance }})\r\n        description: \"Redis instance lost a slave\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis cluster flapping",
                  description:
                    "Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).",
                  query: "changes(redis_connected_slaves[1m]) > 1",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: RedisClusterFlapping\r\n      expr: 'changes(redis_connected_slaves[1m]) > 1'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis cluster flapping (instance {{ $labels.instance }})\r\n        description: \"Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis missing backup",
                  description: "Redis has not been backuped for 24 hours",
                  query:
                    "time() - redis_rdb_last_save_timestamp_seconds > 60 * 60 * 24",
                  severity: "critical",
                  content:
                    "- alert: RedisMissingBackup\r\n      expr: 'time() - redis_rdb_last_save_timestamp_seconds > 60 * 60 * 24'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis missing backup (instance {{ $labels.instance }})\r\n        description: \"Redis has not been backuped for 24 hours\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis out of system memory",
                  description: "Redis is running out of system memory (> 90%)",
                  query:
                    "redis_memory_used_bytes / redis_total_system_memory_bytes * 100 > 90",
                  severity: "warning",
                  for: "2m",
                  comments:
                    "The exporter must be started with --include-system-metrics flag or REDIS_EXPORTER_INCL_SYSTEM_METRICS=true environment variable.\n",
                  content:
                    "# The exporter must be started with --include-system-metrics flag or REDIS_EXPORTER_INCL_SYSTEM_METRICS=true environment variable.\r\n    - alert: RedisOutOfSystemMemory\r\n      expr: 'redis_memory_used_bytes / redis_total_system_memory_bytes * 100 > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Redis out of system memory (instance {{ $labels.instance }})\r\n        description: \"Redis is running out of system memory (> 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis out of configured maxmemory",
                  description:
                    "Redis is running out of configured maxmemory (> 90%)",
                  query:
                    "redis_memory_used_bytes / redis_memory_max_bytes * 100 > 90 and on(instance) redis_memory_max_bytes > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RedisOutOfConfiguredMaxmemory\r\n      expr: 'redis_memory_used_bytes / redis_memory_max_bytes * 100 > 90 and on(instance) redis_memory_max_bytes > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Redis out of configured maxmemory (instance {{ $labels.instance }})\r\n        description: \"Redis is running out of configured maxmemory (> 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis too many connections",
                  description:
                    "Redis is running out of connections (> 90% used)",
                  query:
                    "redis_connected_clients / redis_config_maxclients * 100 > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RedisTooManyConnections\r\n      expr: 'redis_connected_clients / redis_config_maxclients * 100 > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Redis too many connections (instance {{ $labels.instance }})\r\n        description: \"Redis is running out of connections (> 90% used)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis not enough connections",
                  description:
                    "Redis instance should have more connections (> 5)",
                  query: "redis_connected_clients < 5",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RedisNotEnoughConnections\r\n      expr: 'redis_connected_clients < 5'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Redis not enough connections (instance {{ $labels.instance }})\r\n        description: \"Redis instance should have more connections (> 5)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Redis rejected connections",
                  description: "Some connections to Redis has been rejected",
                  query: "increase(redis_rejected_connections_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: RedisRejectedConnections\r\n      expr: 'increase(redis_rejected_connections_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Redis rejected connections (instance {{ $labels.instance }})\r\n        description: \"Some connections to Redis has been rejected\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "MongoDB",
          exporters: [
            {
              name: "percona/mongodb_exporter",
              slug: "percona-mongodb-exporter",
              doc_url: "https://github.com/percona/mongodb_exporter",
              rules: [
                {
                  name: "MongoDB Down",
                  description: "MongoDB instance is down",
                  query: "mongodb_up == 0",
                  severity: "critical",
                  content:
                    "- alert: MongodbDown\r\n      expr: 'mongodb_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB Down (instance {{ $labels.instance }})\r\n        description: \"MongoDB instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Mongodb replica member unhealthy",
                  description: "MongoDB replica member is not healthy",
                  query: "mongodb_rs_members_health == 0",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicaMemberUnhealthy\r\n      expr: 'mongodb_rs_members_health == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Mongodb replica member unhealthy (instance {{ $labels.instance }})\r\n        description: \"MongoDB replica member is not healthy\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB replication lag",
                  description: "Mongodb replication lag is more than 10s",
                  query:
                    '(mongodb_rs_members_optimeDate{member_state="PRIMARY"} - on (set) group_right mongodb_rs_members_optimeDate{member_state="SECONDARY"}) / 1000 > 10',
                  severity: "critical",
                  content:
                    '- alert: MongodbReplicationLag\r\n      expr: \'(mongodb_rs_members_optimeDate{member_state="PRIMARY"} - on (set) group_right mongodb_rs_members_optimeDate{member_state="SECONDARY"}) / 1000 > 10\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication lag (instance {{ $labels.instance }})\r\n        description: "Mongodb replication lag is more than 10s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB replication headroom",
                  description: "MongoDB replication headroom is <= 0",
                  query:
                    'sum(avg(mongodb_mongod_replset_oplog_head_timestamp - mongodb_mongod_replset_oplog_tail_timestamp)) - sum(avg(mongodb_rs_members_optimeDate{member_state="PRIMARY"} - on (set) group_right mongodb_rs_members_optimeDate{member_state="SECONDARY"})) <= 0',
                  severity: "critical",
                  content:
                    '- alert: MongodbReplicationHeadroom\r\n      expr: \'sum(avg(mongodb_mongod_replset_oplog_head_timestamp - mongodb_mongod_replset_oplog_tail_timestamp)) - sum(avg(mongodb_rs_members_optimeDate{member_state="PRIMARY"} - on (set) group_right mongodb_rs_members_optimeDate{member_state="SECONDARY"})) <= 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication headroom (instance {{ $labels.instance }})\r\n        description: "MongoDB replication headroom is <= 0\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB number cursors open",
                  description:
                    "Too many cursors opened by MongoDB for clients (> 10k)",
                  query:
                    'mongodb_ss_metrics_cursor_open{csr_type="total"} > 10 * 1000',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: MongodbNumberCursorsOpen\r\n      expr: \'mongodb_ss_metrics_cursor_open{csr_type="total"} > 10 * 1000\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB number cursors open (instance {{ $labels.instance }})\r\n        description: "Too many cursors opened by MongoDB for clients (> 10k)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB cursors timeouts",
                  description: "Too many cursors are timing out",
                  query:
                    "increase(mongodb_ss_metrics_cursor_timedOut[1m]) > 100",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MongodbCursorsTimeouts\r\n      expr: 'increase(mongodb_ss_metrics_cursor_timedOut[1m]) > 100'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB cursors timeouts (instance {{ $labels.instance }})\r\n        description: \"Too many cursors are timing out\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB too many connections",
                  description: "Too many connections (> 80%)",
                  query:
                    'avg by(instance) (rate(mongodb_ss_connections{conn_type="current"}[1m])) / avg by(instance) (sum (mongodb_ss_connections) by (instance)) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: MongodbTooManyConnections\r\n      expr: \'avg by(instance) (rate(mongodb_ss_connections{conn_type="current"}[1m])) / avg by(instance) (sum (mongodb_ss_connections) by (instance)) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB too many connections (instance {{ $labels.instance }})\r\n        description: "Too many connections (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "dcu/mongodb_exporter",
              slug: "dcu-mongodb-exporter",
              doc_url: "https://github.com/dcu/mongodb_exporter",
              rules: [
                {
                  name: "MongoDB replication lag",
                  description: "Mongodb replication lag is more than 10s",
                  query:
                    'avg(mongodb_replset_member_optime_date{state="PRIMARY"}) - avg(mongodb_replset_member_optime_date{state="SECONDARY"}) > 10',
                  severity: "critical",
                  content:
                    '- alert: MongodbReplicationLag\r\n      expr: \'avg(mongodb_replset_member_optime_date{state="PRIMARY"}) - avg(mongodb_replset_member_optime_date{state="SECONDARY"}) > 10\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication lag (instance {{ $labels.instance }})\r\n        description: "Mongodb replication lag is more than 10s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB replication Status 3",
                  description:
                    "MongoDB Replication set member either perform startup self-checks, or transition from completing a rollback or resync",
                  query: "mongodb_replset_member_state == 3",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicationStatus3\r\n      expr: 'mongodb_replset_member_state == 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication Status 3 (instance {{ $labels.instance }})\r\n        description: \"MongoDB Replication set member either perform startup self-checks, or transition from completing a rollback or resync\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB replication Status 6",
                  description:
                    "MongoDB Replication set member as seen from another member of the set, is not yet known",
                  query: "mongodb_replset_member_state == 6",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicationStatus6\r\n      expr: 'mongodb_replset_member_state == 6'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication Status 6 (instance {{ $labels.instance }})\r\n        description: \"MongoDB Replication set member as seen from another member of the set, is not yet known\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB replication Status 8",
                  description:
                    "MongoDB Replication set member as seen from another member of the set, is unreachable",
                  query: "mongodb_replset_member_state == 8",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicationStatus8\r\n      expr: 'mongodb_replset_member_state == 8'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication Status 8 (instance {{ $labels.instance }})\r\n        description: \"MongoDB Replication set member as seen from another member of the set, is unreachable\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB replication Status 9",
                  description:
                    "MongoDB Replication set member is actively performing a rollback. Data is not available for reads",
                  query: "mongodb_replset_member_state == 9",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicationStatus9\r\n      expr: 'mongodb_replset_member_state == 9'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication Status 9 (instance {{ $labels.instance }})\r\n        description: \"MongoDB Replication set member is actively performing a rollback. Data is not available for reads\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB replication Status 10",
                  description:
                    "MongoDB Replication set member was once in a replica set but was subsequently removed",
                  query: "mongodb_replset_member_state == 10",
                  severity: "critical",
                  content:
                    "- alert: MongodbReplicationStatus10\r\n      expr: 'mongodb_replset_member_state == 10'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: MongoDB replication Status 10 (instance {{ $labels.instance }})\r\n        description: \"MongoDB Replication set member was once in a replica set but was subsequently removed\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB number cursors open",
                  description:
                    "Too many cursors opened by MongoDB for clients (> 10k)",
                  query:
                    'mongodb_metrics_cursor_open{state="total_open"} > 10000',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: MongodbNumberCursorsOpen\r\n      expr: \'mongodb_metrics_cursor_open{state="total_open"} > 10000\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB number cursors open (instance {{ $labels.instance }})\r\n        description: "Too many cursors opened by MongoDB for clients (> 10k)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB cursors timeouts",
                  description: "Too many cursors are timing out",
                  query:
                    "increase(mongodb_metrics_cursor_timed_out_total[1m]) > 100",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: MongodbCursorsTimeouts\r\n      expr: 'increase(mongodb_metrics_cursor_timed_out_total[1m]) > 100'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB cursors timeouts (instance {{ $labels.instance }})\r\n        description: \"Too many cursors are timing out\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "MongoDB too many connections",
                  description: "Too many connections (> 80%)",
                  query:
                    'avg by(instance) (rate(mongodb_connections{state="current"}[1m])) / avg by(instance) (sum (mongodb_connections) by (instance)) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: MongodbTooManyConnections\r\n      expr: \'avg by(instance) (rate(mongodb_connections{state="current"}[1m])) / avg by(instance) (sum (mongodb_connections) by (instance)) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB too many connections (instance {{ $labels.instance }})\r\n        description: "Too many connections (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "MongoDB virtual memory usage",
                  description: "High memory usage",
                  query:
                    '(sum(mongodb_memory{type="virtual"}) BY (instance) / sum(mongodb_memory{type="mapped"}) BY (instance)) > 3',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: MongodbVirtualMemoryUsage\r\n      expr: \'(sum(mongodb_memory{type="virtual"}) BY (instance) / sum(mongodb_memory{type="mapped"}) BY (instance)) > 3\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: MongoDB virtual memory usage (instance {{ $labels.instance }})\r\n        description: "High memory usage\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "stefanprodan/mgob",
              slug: "stefanprodan-mgob-exporter",
              doc_url: "https://github.com/stefanprodan/mgob",
              rules: [
                {
                  name: "Mgob backup failed",
                  description: "MongoDB backup has failed",
                  query:
                    'changes(mgob_scheduler_backup_total{status="500"}[1h]) > 0',
                  severity: "critical",
                  content:
                    '- alert: MgobBackupFailed\r\n      expr: \'changes(mgob_scheduler_backup_total{status="500"}[1h]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Mgob backup failed (instance {{ $labels.instance }})\r\n        description: "MongoDB backup has failed\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "RabbitMQ",
          exporters: [
            {
              name: "rabbitmq/rabbitmq-prometheus",
              slug: "rabbitmq-exporter",
              doc_url: "https://github.com/rabbitmq/rabbitmq-prometheus",
              rules: [
                {
                  name: "RabbitMQ node down",
                  description: "Less than 3 nodes running in RabbitMQ cluster",
                  query: "sum(rabbitmq_build_info) < 3",
                  severity: "critical",
                  content:
                    "- alert: RabbitmqNodeDown\r\n      expr: 'sum(rabbitmq_build_info) < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ node down (instance {{ $labels.instance }})\r\n        description: \"Less than 3 nodes running in RabbitMQ cluster\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ node not distributed",
                  description: "Distribution link state is not 'up'",
                  query: "erlang_vm_dist_node_state < 3",
                  severity: "critical",
                  content:
                    "- alert: RabbitmqNodeNotDistributed\r\n      expr: 'erlang_vm_dist_node_state < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ node not distributed (instance {{ $labels.instance }})\r\n        description: \"Distribution link state is not 'up'\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ instances different versions",
                  description:
                    "Running different version of RabbitMQ in the same cluster, can lead to failure.",
                  query:
                    "count(count(rabbitmq_build_info) by (rabbitmq_version)) > 1",
                  severity: "warning",
                  for: "1h",
                  content:
                    "- alert: RabbitmqInstancesDifferentVersions\r\n      expr: 'count(count(rabbitmq_build_info) by (rabbitmq_version)) > 1'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ instances different versions (instance {{ $labels.instance }})\r\n        description: \"Running different version of RabbitMQ in the same cluster, can lead to failure.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ memory high",
                  description: "A node use more than 90% of allocated RAM",
                  query:
                    "rabbitmq_process_resident_memory_bytes / rabbitmq_resident_memory_limit_bytes * 100 > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqMemoryHigh\r\n      expr: 'rabbitmq_process_resident_memory_bytes / rabbitmq_resident_memory_limit_bytes * 100 > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ memory high (instance {{ $labels.instance }})\r\n        description: \"A node use more than 90% of allocated RAM\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ file descriptors usage",
                  description: "A node use more than 90% of file descriptors",
                  query:
                    "rabbitmq_process_open_fds / rabbitmq_process_max_fds * 100 > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqFileDescriptorsUsage\r\n      expr: 'rabbitmq_process_open_fds / rabbitmq_process_max_fds * 100 > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ file descriptors usage (instance {{ $labels.instance }})\r\n        description: \"A node use more than 90% of file descriptors\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ too many unack messages",
                  description: "Too many unacknowledged messages",
                  query:
                    "sum(rabbitmq_queue_messages_unacked) BY (queue) > 1000",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: RabbitmqTooManyUnackMessages\r\n      expr: 'sum(rabbitmq_queue_messages_unacked) BY (queue) > 1000'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ too many unack messages (instance {{ $labels.instance }})\r\n        description: \"Too many unacknowledged messages\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ too many connections",
                  description: "The total connections of a node is too high",
                  query: "rabbitmq_connections > 1000",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqTooManyConnections\r\n      expr: 'rabbitmq_connections > 1000'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ too many connections (instance {{ $labels.instance }})\r\n        description: \"The total connections of a node is too high\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ no queue consumer",
                  description: "A queue has less than 1 consumer",
                  query: "rabbitmq_queue_consumers < 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: RabbitmqNoQueueConsumer\r\n      expr: 'rabbitmq_queue_consumers < 1'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ no queue consumer (instance {{ $labels.instance }})\r\n        description: \"A queue has less than 1 consumer\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ unroutable messages",
                  description: "A queue has unroutable messages",
                  query:
                    "increase(rabbitmq_channel_messages_unroutable_returned_total[1m]) > 0 or increase(rabbitmq_channel_messages_unroutable_dropped_total[1m]) > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqUnroutableMessages\r\n      expr: 'increase(rabbitmq_channel_messages_unroutable_returned_total[1m]) > 0 or increase(rabbitmq_channel_messages_unroutable_dropped_total[1m]) > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ unroutable messages (instance {{ $labels.instance }})\r\n        description: \"A queue has unroutable messages\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
            {
              name: "kbudde/rabbitmq-exporter",
              slug: "kbudde-rabbitmq-exporter",
              doc_url: "https://github.com/kbudde/rabbitmq_exporter",
              rules: [
                {
                  name: "RabbitMQ down",
                  description: "RabbitMQ node down",
                  query: "rabbitmq_up == 0",
                  severity: "critical",
                  content:
                    "- alert: RabbitmqDown\r\n      expr: 'rabbitmq_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ down (instance {{ $labels.instance }})\r\n        description: \"RabbitMQ node down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ cluster down",
                  description: "Less than 3 nodes running in RabbitMQ cluster",
                  query: "sum(rabbitmq_running) < 3",
                  severity: "critical",
                  content:
                    "- alert: RabbitmqClusterDown\r\n      expr: 'sum(rabbitmq_running) < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ cluster down (instance {{ $labels.instance }})\r\n        description: \"Less than 3 nodes running in RabbitMQ cluster\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ cluster partition",
                  description: "Cluster partition",
                  query: "rabbitmq_partitions > 0",
                  severity: "critical",
                  content:
                    "- alert: RabbitmqClusterPartition\r\n      expr: 'rabbitmq_partitions > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ cluster partition (instance {{ $labels.instance }})\r\n        description: \"Cluster partition\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ out of memory",
                  description: "Memory available for RabbmitMQ is low (< 10%)",
                  query:
                    "rabbitmq_node_mem_used / rabbitmq_node_mem_limit * 100 > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqOutOfMemory\r\n      expr: 'rabbitmq_node_mem_used / rabbitmq_node_mem_limit * 100 > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ out of memory (instance {{ $labels.instance }})\r\n        description: \"Memory available for RabbmitMQ is low (< 10%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ too many connections",
                  description:
                    "RabbitMQ instance has too many connections (> 1000)",
                  query: "rabbitmq_connectionsTotal > 1000",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: RabbitmqTooManyConnections\r\n      expr: 'rabbitmq_connectionsTotal > 1000'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ too many connections (instance {{ $labels.instance }})\r\n        description: \"RabbitMQ instance has too many connections (> 1000)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ dead letter queue filling up",
                  description: "Dead letter queue is filling up (> 10 msgs)",
                  query:
                    'rabbitmq_queue_messages{queue="my-dead-letter-queue"} > 10',
                  severity: "warning",
                  for: "1m",
                  comments: "Indicate the queue name in dedicated label.\n",
                  content:
                    '# Indicate the queue name in dedicated label.\r\n    - alert: RabbitmqDeadLetterQueueFillingUp\r\n      expr: \'rabbitmq_queue_messages{queue="my-dead-letter-queue"} > 10\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ dead letter queue filling up (instance {{ $labels.instance }})\r\n        description: "Dead letter queue is filling up (> 10 msgs)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "RabbitMQ too many messages in queue",
                  description: "Queue is filling up (> 1000 msgs)",
                  query:
                    'rabbitmq_queue_messages_ready{queue="my-queue"} > 1000',
                  severity: "warning",
                  for: "2m",
                  comments: "Indicate the queue name in dedicated label.\n",
                  content:
                    '# Indicate the queue name in dedicated label.\r\n    - alert: RabbitmqTooManyMessagesInQueue\r\n      expr: \'rabbitmq_queue_messages_ready{queue="my-queue"} > 1000\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ too many messages in queue (instance {{ $labels.instance }})\r\n        description: "Queue is filling up (> 1000 msgs)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "RabbitMQ slow queue consuming",
                  description: "Queue messages are consumed slowly (> 60s)",
                  query:
                    'time() - rabbitmq_queue_head_message_timestamp{queue="my-queue"} > 60',
                  severity: "warning",
                  for: "2m",
                  comments: "Indicate the queue name in dedicated label.\n",
                  content:
                    '# Indicate the queue name in dedicated label.\r\n    - alert: RabbitmqSlowQueueConsuming\r\n      expr: \'time() - rabbitmq_queue_head_message_timestamp{queue="my-queue"} > 60\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ slow queue consuming (instance {{ $labels.instance }})\r\n        description: "Queue messages are consumed slowly (> 60s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "RabbitMQ no consumer",
                  description: "Queue has no consumer",
                  query: "rabbitmq_queue_consumers == 0",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: RabbitmqNoConsumer\r\n      expr: 'rabbitmq_queue_consumers == 0'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ no consumer (instance {{ $labels.instance }})\r\n        description: \"Queue has no consumer\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "RabbitMQ too many consumers",
                  description: "Queue should have only 1 consumer",
                  query: 'rabbitmq_queue_consumers{queue="my-queue"} > 1',
                  severity: "critical",
                  comments: "Indicate the queue name in dedicated label.\n",
                  content:
                    '# Indicate the queue name in dedicated label.\r\n    - alert: RabbitmqTooManyConsumers\r\n      expr: \'rabbitmq_queue_consumers{queue="my-queue"} > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: RabbitMQ too many consumers (instance {{ $labels.instance }})\r\n        description: "Queue should have only 1 consumer\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "RabbitMQ unactive exchange",
                  description: "Exchange receive less than 5 msgs per second",
                  query:
                    'rate(rabbitmq_exchange_messages_published_in_total{exchange="my-exchange"}[1m]) < 5',
                  severity: "warning",
                  comments: "Indicate the exchange name in dedicated label.\n",
                  for: "2m",
                  content:
                    '# Indicate the exchange name in dedicated label.\r\n    - alert: RabbitmqUnactiveExchange\r\n      expr: \'rate(rabbitmq_exchange_messages_published_in_total{exchange="my-exchange"}[1m]) < 5\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: RabbitMQ unactive exchange (instance {{ $labels.instance }})\r\n        description: "Exchange receive less than 5 msgs per second\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Elasticsearch",
          exporters: [
            {
              name: "prometheus-community/elasticsearch_exporter",
              slug: "prometheus-community-elasticsearch-exporter",
              doc_url:
                "https://github.com/prometheus-community/elasticsearch_exporter",
              rules: [
                {
                  name: "Elasticsearch Heap Usage Too High",
                  description: "The heap usage is over 90%",
                  query:
                    '(elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 90',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: ElasticsearchHeapUsageTooHigh\r\n      expr: \'(elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 90\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch Heap Usage Too High (instance {{ $labels.instance }})\r\n        description: "The heap usage is over 90%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Elasticsearch Heap Usage warning",
                  description: "The heap usage is over 80%",
                  query:
                    '(elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: ElasticsearchHeapUsageWarning\r\n      expr: \'(elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch Heap Usage warning (instance {{ $labels.instance }})\r\n        description: "The heap usage is over 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Elasticsearch disk out of space",
                  description: "The disk usage is over 90%",
                  query:
                    "elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 10",
                  severity: "critical",
                  content:
                    "- alert: ElasticsearchDiskOutOfSpace\r\n      expr: 'elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 10'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch disk out of space (instance {{ $labels.instance }})\r\n        description: \"The disk usage is over 90%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch disk space low",
                  description: "The disk usage is over 80%",
                  query:
                    "elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 20",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: ElasticsearchDiskSpaceLow\r\n      expr: 'elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 20'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch disk space low (instance {{ $labels.instance }})\r\n        description: \"The disk usage is over 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch Cluster Red",
                  description: "Elastic Cluster Red status",
                  query:
                    'elasticsearch_cluster_health_status{color="red"} == 1',
                  severity: "critical",
                  content:
                    '- alert: ElasticsearchClusterRed\r\n      expr: \'elasticsearch_cluster_health_status{color="red"} == 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch Cluster Red (instance {{ $labels.instance }})\r\n        description: "Elastic Cluster Red status\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Elasticsearch Cluster Yellow",
                  description: "Elastic Cluster Yellow status",
                  query:
                    'elasticsearch_cluster_health_status{color="yellow"} == 1',
                  severity: "warning",
                  content:
                    '- alert: ElasticsearchClusterYellow\r\n      expr: \'elasticsearch_cluster_health_status{color="yellow"} == 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch Cluster Yellow (instance {{ $labels.instance }})\r\n        description: "Elastic Cluster Yellow status\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Elasticsearch Healthy Nodes",
                  description: "Missing node in Elasticsearch cluster",
                  query: "elasticsearch_cluster_health_number_of_nodes < 3",
                  severity: "critical",
                  content:
                    "- alert: ElasticsearchHealthyNodes\r\n      expr: 'elasticsearch_cluster_health_number_of_nodes < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch Healthy Nodes (instance {{ $labels.instance }})\r\n        description: \"Missing node in Elasticsearch cluster\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch Healthy Data Nodes",
                  description: "Missing data node in Elasticsearch cluster",
                  query:
                    "elasticsearch_cluster_health_number_of_data_nodes < 3",
                  severity: "critical",
                  content:
                    "- alert: ElasticsearchHealthyDataNodes\r\n      expr: 'elasticsearch_cluster_health_number_of_data_nodes < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch Healthy Data Nodes (instance {{ $labels.instance }})\r\n        description: \"Missing data node in Elasticsearch cluster\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch relocating shards",
                  description: "Elasticsearch is relocating shards",
                  query: "elasticsearch_cluster_health_relocating_shards > 0",
                  severity: "info",
                  content:
                    "- alert: ElasticsearchRelocatingShards\r\n      expr: 'elasticsearch_cluster_health_relocating_shards > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Elasticsearch relocating shards (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch is relocating shards\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch relocating shards too long",
                  description:
                    "Elasticsearch has been relocating shards for 15min",
                  query: "elasticsearch_cluster_health_relocating_shards > 0",
                  severity: "warning",
                  for: "15m",
                  content:
                    "- alert: ElasticsearchRelocatingShardsTooLong\r\n      expr: 'elasticsearch_cluster_health_relocating_shards > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch relocating shards too long (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch has been relocating shards for 15min\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch initializing shards",
                  description: "Elasticsearch is initializing shards",
                  query: "elasticsearch_cluster_health_initializing_shards > 0",
                  severity: "info",
                  content:
                    "- alert: ElasticsearchInitializingShards\r\n      expr: 'elasticsearch_cluster_health_initializing_shards > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Elasticsearch initializing shards (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch is initializing shards\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch initializing shards too long",
                  description:
                    "Elasticsearch has been initializing shards for 15 min",
                  query: "elasticsearch_cluster_health_initializing_shards > 0",
                  severity: "warning",
                  for: "15m",
                  content:
                    "- alert: ElasticsearchInitializingShardsTooLong\r\n      expr: 'elasticsearch_cluster_health_initializing_shards > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch initializing shards too long (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch has been initializing shards for 15 min\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch unassigned shards",
                  description: "Elasticsearch has unassigned shards",
                  query: "elasticsearch_cluster_health_unassigned_shards > 0",
                  severity: "critical",
                  content:
                    "- alert: ElasticsearchUnassignedShards\r\n      expr: 'elasticsearch_cluster_health_unassigned_shards > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Elasticsearch unassigned shards (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch has unassigned shards\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch pending tasks",
                  description:
                    "Elasticsearch has pending tasks. Cluster works slowly.",
                  query:
                    "elasticsearch_cluster_health_number_of_pending_tasks > 0",
                  severity: "warning",
                  for: "15m",
                  content:
                    "- alert: ElasticsearchPendingTasks\r\n      expr: 'elasticsearch_cluster_health_number_of_pending_tasks > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch pending tasks (instance {{ $labels.instance }})\r\n        description: \"Elasticsearch has pending tasks. Cluster works slowly.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch no new documents",
                  description: "No new documents for 10 min!",
                  query:
                    'increase(elasticsearch_indices_indexing_index_total{es_data_node="true"}[10m]) < 1',
                  severity: "warning",
                  content:
                    '- alert: ElasticsearchNoNewDocuments\r\n      expr: \'increase(elasticsearch_indices_indexing_index_total{es_data_node="true"}[10m]) < 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch no new documents (instance {{ $labels.instance }})\r\n        description: "No new documents for 10 min!\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Elasticsearch High Indexing Latency",
                  description:
                    "The indexing latency on Elasticsearch cluster is higher than the threshold.",
                  query:
                    "elasticsearch_indices_indexing_index_time_seconds_total / elasticsearch_indices_indexing_index_total > 0.0005",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: ElasticsearchHighIndexingLatency\r\n      expr: 'elasticsearch_indices_indexing_index_time_seconds_total / elasticsearch_indices_indexing_index_total > 0.0005'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch High Indexing Latency (instance {{ $labels.instance }})\r\n        description: \"The indexing latency on Elasticsearch cluster is higher than the threshold.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch High Indexing Rate",
                  description:
                    "The indexing rate on Elasticsearch cluster is higher than the threshold.",
                  query:
                    "sum(rate(elasticsearch_indices_indexing_index_total[1m]))> 10000",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: ElasticsearchHighIndexingRate\r\n      expr: 'sum(rate(elasticsearch_indices_indexing_index_total[1m]))> 10000'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch High Indexing Rate (instance {{ $labels.instance }})\r\n        description: \"The indexing rate on Elasticsearch cluster is higher than the threshold.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch High Query Rate",
                  description:
                    "The query rate on Elasticsearch cluster is higher than the threshold.",
                  query:
                    "sum(rate(elasticsearch_indices_search_query_total[1m])) > 100",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: ElasticsearchHighQueryRate\r\n      expr: 'sum(rate(elasticsearch_indices_search_query_total[1m])) > 100'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch High Query Rate (instance {{ $labels.instance }})\r\n        description: \"The query rate on Elasticsearch cluster is higher than the threshold.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Elasticsearch High Query Latency",
                  description:
                    "The query latency on Elasticsearch cluster is higher than the threshold.",
                  query:
                    "elasticsearch_indices_search_fetch_time_seconds / elasticsearch_indices_search_fetch_total > 1",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: ElasticsearchHighQueryLatency\r\n      expr: 'elasticsearch_indices_search_fetch_time_seconds / elasticsearch_indices_search_fetch_total > 1'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Elasticsearch High Query Latency (instance {{ $labels.instance }})\r\n        description: \"The query latency on Elasticsearch cluster is higher than the threshold.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Meilisearch",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url: "https://github.com/orgs/meilisearch/discussions/625",
              rules: [
                {
                  name: "Meilisearch index is empty",
                  description: "Meilisearch instance is down",
                  query: "meilisearch_index_docs_count == 0",
                  severity: "warning",
                  content:
                    "- alert: MeilisearchIndexIsEmpty\r\n      expr: 'meilisearch_index_docs_count == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Meilisearch index is empty (instance {{ $labels.instance }})\r\n        description: \"Meilisearch instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Meilisearch http response time",
                  description: "Meilisearch http response time is too high",
                  query: "meilisearch_http_response_time_seconds > 0.5",
                  severity: "warning",
                  content:
                    "- alert: MeilisearchHttpResponseTime\r\n      expr: 'meilisearch_http_response_time_seconds > 0.5'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Meilisearch http response time (instance {{ $labels.instance }})\r\n        description: \"Meilisearch http response time is too high\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Cassandra",
          exporters: [
            {
              name: "instaclustr/cassandra-exporter",
              slug: "instaclustr-cassandra-exporter",
              doc_url: "https://github.com/instaclustr/cassandra-exporter",
              rules: [
                {
                  name: "Cassandra Node is unavailable",
                  description:
                    "Cassandra Node is unavailable - {{ $labels.cassandra_cluster }} {{ $labels.exported_endpoint }}",
                  query:
                    "sum(cassandra_endpoint_active) by (cassandra_cluster,instance,exported_endpoint) < 1",
                  severity: "critical",
                  content:
                    "- alert: CassandraNodeIsUnavailable\r\n      expr: 'sum(cassandra_endpoint_active) by (cassandra_cluster,instance,exported_endpoint) < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra Node is unavailable (instance {{ $labels.instance }})\r\n        description: \"Cassandra Node is unavailable - {{ $labels.cassandra_cluster }} {{ $labels.exported_endpoint }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cassandra many compaction tasks are pending",
                  description:
                    "Many Cassandra compaction tasks are pending - {{ $labels.cassandra_cluster }}",
                  query: "cassandra_table_estimated_pending_compactions > 100",
                  severity: "warning",
                  content:
                    "- alert: CassandraManyCompactionTasksArePending\r\n      expr: 'cassandra_table_estimated_pending_compactions > 100'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra many compaction tasks are pending (instance {{ $labels.instance }})\r\n        description: \"Many Cassandra compaction tasks are pending - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cassandra commitlog pending tasks",
                  description:
                    "Cassandra commitlog pending tasks - {{ $labels.cassandra_cluster }}",
                  query: "cassandra_commit_log_pending_tasks > 15",
                  for: "2m",
                  severity: "warning",
                  content:
                    "- alert: CassandraCommitlogPendingTasks\r\n      expr: 'cassandra_commit_log_pending_tasks > 15'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra commitlog pending tasks (instance {{ $labels.instance }})\r\n        description: \"Cassandra commitlog pending tasks - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cassandra compaction executor blocked tasks",
                  description:
                    "Some Cassandra compaction executor tasks are blocked - {{ $labels.cassandra_cluster }}",
                  query:
                    'cassandra_thread_pool_blocked_tasks{pool="CompactionExecutor"} > 15',
                  for: "2m",
                  severity: "warning",
                  content:
                    '- alert: CassandraCompactionExecutorBlockedTasks\r\n      expr: \'cassandra_thread_pool_blocked_tasks{pool="CompactionExecutor"} > 15\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra compaction executor blocked tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra compaction executor tasks are blocked - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra flush writer blocked tasks",
                  description:
                    "Some Cassandra flush writer tasks are blocked - {{ $labels.cassandra_cluster }}",
                  query:
                    'cassandra_thread_pool_blocked_tasks{pool="MemtableFlushWriter"} > 15',
                  for: "2m",
                  severity: "warning",
                  content:
                    '- alert: CassandraFlushWriterBlockedTasks\r\n      expr: \'cassandra_thread_pool_blocked_tasks{pool="MemtableFlushWriter"} > 15\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra flush writer blocked tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra flush writer tasks are blocked - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra connection timeouts total",
                  description:
                    "Some connection between nodes are ending in timeout - {{ $labels.cassandra_cluster }}",
                  query:
                    "avg(cassandra_client_request_timeouts_total) by (cassandra_cluster,instance) > 5",
                  for: "2m",
                  severity: "critical",
                  content:
                    "- alert: CassandraConnectionTimeoutsTotal\r\n      expr: 'avg(cassandra_client_request_timeouts_total) by (cassandra_cluster,instance) > 5'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra connection timeouts total (instance {{ $labels.instance }})\r\n        description: \"Some connection between nodes are ending in timeout - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cassandra storage exceptions",
                  description:
                    "Something is going wrong with cassandra storage - {{ $labels.cassandra_cluster }}",
                  query: "changes(cassandra_storage_exceptions_total[1m]) > 1",
                  severity: "critical",
                  content:
                    "- alert: CassandraStorageExceptions\r\n      expr: 'changes(cassandra_storage_exceptions_total[1m]) > 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra storage exceptions (instance {{ $labels.instance }})\r\n        description: \"Something is going wrong with cassandra storage - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cassandra tombstone dump",
                  description:
                    "Cassandra tombstone dump - {{ $labels.cassandra_cluster }}",
                  query:
                    'avg(cassandra_table_tombstones_scanned{quantile="0.99"}) by (instance,cassandra_cluster,keyspace) > 100',
                  for: "2m",
                  severity: "critical",
                  content:
                    '- alert: CassandraTombstoneDump\r\n      expr: \'avg(cassandra_table_tombstones_scanned{quantile="0.99"}) by (instance,cassandra_cluster,keyspace) > 100\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra tombstone dump (instance {{ $labels.instance }})\r\n        description: "Cassandra tombstone dump - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request unavailable write",
                  description:
                    "Some Cassandra client requests are unavailable to write - {{ $labels.cassandra_cluster }}",
                  query:
                    'changes(cassandra_client_request_unavailable_exceptions_total{operation="write"}[1m]) > 0',
                  for: "2m",
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestUnavailableWrite\r\n      expr: \'changes(cassandra_client_request_unavailable_exceptions_total{operation="write"}[1m]) > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request unavailable write (instance {{ $labels.instance }})\r\n        description: "Some Cassandra client requests are unavailable to write - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request unavailable read",
                  description:
                    "Some Cassandra client requests are unavailable to read - {{ $labels.cassandra_cluster }}",
                  query:
                    'changes(cassandra_client_request_unavailable_exceptions_total{operation="read"}[1m]) > 0',
                  for: "2m",
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestUnavailableRead\r\n      expr: \'changes(cassandra_client_request_unavailable_exceptions_total{operation="read"}[1m]) > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request unavailable read (instance {{ $labels.instance }})\r\n        description: "Some Cassandra client requests are unavailable to read - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request write failure",
                  description:
                    "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}",
                  query:
                    'increase(cassandra_client_request_failures_total{operation="write"}[1m]) > 0',
                  for: "2m",
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestWriteFailure\r\n      expr: \'increase(cassandra_client_request_failures_total{operation="write"}[1m]) > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request write failure (instance {{ $labels.instance }})\r\n        description: "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request read failure",
                  description:
                    "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}",
                  query:
                    'increase(cassandra_client_request_failures_total{operation="read"}[1m]) > 0',
                  for: "2m",
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestReadFailure\r\n      expr: \'increase(cassandra_client_request_failures_total{operation="read"}[1m]) > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request read failure (instance {{ $labels.instance }})\r\n        description: "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "criteo/cassandra_exporter",
              slug: "criteo-cassandra-exporter",
              doc_url: "https://github.com/criteo/cassandra_exporter",
              rules: [
                {
                  name: "Cassandra hints count",
                  description:
                    "Cassandra hints count has changed on {{ $labels.instance }} some nodes may go down",
                  query:
                    'changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:totalhints:count"}[1m]) > 3',
                  severity: "critical",
                  content:
                    '- alert: CassandraHintsCount\r\n      expr: \'changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:totalhints:count"}[1m]) > 3\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra hints count (instance {{ $labels.instance }})\r\n        description: "Cassandra hints count has changed on {{ $labels.instance }} some nodes may go down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra compaction task pending",
                  description:
                    "Many Cassandra compaction tasks are pending. You might need to increase I/O capacity by adding nodes to the cluster.",
                  query:
                    'avg_over_time(cassandra_stats{name="org:apache:cassandra:metrics:compaction:pendingtasks:value"}[1m]) > 100',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraCompactionTaskPending\r\n      expr: \'avg_over_time(cassandra_stats{name="org:apache:cassandra:metrics:compaction:pendingtasks:value"}[1m]) > 100\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra compaction task pending (instance {{ $labels.instance }})\r\n        description: "Many Cassandra compaction tasks are pending. You might need to increase I/O capacity by adding nodes to the cluster.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra viewwrite latency",
                  description:
                    "High viewwrite latency on {{ $labels.instance }} cassandra node",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:viewwrite:viewwritelatency:99thpercentile",service="cas"} > 100000',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraViewwriteLatency\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:viewwrite:viewwritelatency:99thpercentile",service="cas"} > 100000\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra viewwrite latency (instance {{ $labels.instance }})\r\n        description: "High viewwrite latency on {{ $labels.instance }} cassandra node\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra bad hacker",
                  description: "Increase of Cassandra authentication failures",
                  query:
                    'rate(cassandra_stats{name="org:apache:cassandra:metrics:client:authfailure:count"}[1m]) > 5',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraBadHacker\r\n      expr: \'rate(cassandra_stats{name="org:apache:cassandra:metrics:client:authfailure:count"}[1m]) > 5\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra bad hacker (instance {{ $labels.instance }})\r\n        description: "Increase of Cassandra authentication failures\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra node down",
                  description: "Cassandra node down",
                  query:
                    'sum(cassandra_stats{name="org:apache:cassandra:net:failuredetector:downendpointcount"}) by (service,group,cluster,env) > 0',
                  severity: "critical",
                  content:
                    '- alert: CassandraNodeDown\r\n      expr: \'sum(cassandra_stats{name="org:apache:cassandra:net:failuredetector:downendpointcount"}) by (service,group,cluster,env) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra node down (instance {{ $labels.instance }})\r\n        description: "Cassandra node down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra commitlog pending tasks",
                  description:
                    "Unexpected number of Cassandra commitlog pending tasks",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:commitlog:pendingtasks:value"} > 15',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraCommitlogPendingTasks\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:commitlog:pendingtasks:value"} > 15\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra commitlog pending tasks (instance {{ $labels.instance }})\r\n        description: "Unexpected number of Cassandra commitlog pending tasks\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra compaction executor blocked tasks",
                  description:
                    "Some Cassandra compaction executor tasks are blocked",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:compactionexecutor:currentlyblockedtasks:count"} > 0',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraCompactionExecutorBlockedTasks\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:compactionexecutor:currentlyblockedtasks:count"} > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra compaction executor blocked tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra compaction executor tasks are blocked\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra flush writer blocked tasks",
                  description: "Some Cassandra flush writer tasks are blocked",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:memtableflushwriter:currentlyblockedtasks:count"} > 0',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraFlushWriterBlockedTasks\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:memtableflushwriter:currentlyblockedtasks:count"} > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra flush writer blocked tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra flush writer tasks are blocked\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra repair pending tasks",
                  description: "Some Cassandra repair tasks are pending",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:pendingtasks:value"} > 2',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraRepairPendingTasks\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:pendingtasks:value"} > 2\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra repair pending tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra repair tasks are pending\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra repair blocked tasks",
                  description: "Some Cassandra repair tasks are blocked",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:currentlyblockedtasks:count"} > 0',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: CassandraRepairBlockedTasks\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:currentlyblockedtasks:count"} > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cassandra repair blocked tasks (instance {{ $labels.instance }})\r\n        description: "Some Cassandra repair tasks are blocked\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra connection timeouts total",
                  description:
                    "Some connection between nodes are ending in timeout",
                  query:
                    'rate(cassandra_stats{name="org:apache:cassandra:metrics:connection:totaltimeouts:count"}[1m]) > 5',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: CassandraConnectionTimeoutsTotal\r\n      expr: \'rate(cassandra_stats{name="org:apache:cassandra:metrics:connection:totaltimeouts:count"}[1m]) > 5\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra connection timeouts total (instance {{ $labels.instance }})\r\n        description: "Some connection between nodes are ending in timeout\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra storage exceptions",
                  description:
                    "Something is going wrong with cassandra storage",
                  query:
                    'changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:exceptions:count"}[1m]) > 1',
                  severity: "critical",
                  content:
                    '- alert: CassandraStorageExceptions\r\n      expr: \'changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:exceptions:count"}[1m]) > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra storage exceptions (instance {{ $labels.instance }})\r\n        description: "Something is going wrong with cassandra storage\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra tombstone dump",
                  description: "Too much tombstones scanned in queries",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:table:tombstonescannedhistogram:99thpercentile"} > 1000',
                  severity: "critical",
                  content:
                    '- alert: CassandraTombstoneDump\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:table:tombstonescannedhistogram:99thpercentile"} > 1000\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra tombstone dump (instance {{ $labels.instance }})\r\n        description: "Too much tombstones scanned in queries\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request unavailable write",
                  description:
                    "Write failures have occurred because too many nodes are unavailable",
                  query:
                    'changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:unavailables:count"}[1m]) > 0',
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestUnavailableWrite\r\n      expr: \'changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:unavailables:count"}[1m]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request unavailable write (instance {{ $labels.instance }})\r\n        description: "Write failures have occurred because too many nodes are unavailable\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request unavailable read",
                  description:
                    "Read failures have occurred because too many nodes are unavailable",
                  query:
                    'changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:unavailables:count"}[1m]) > 0',
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestUnavailableRead\r\n      expr: \'changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:unavailables:count"}[1m]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request unavailable read (instance {{ $labels.instance }})\r\n        description: "Read failures have occurred because too many nodes are unavailable\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request write failure",
                  description:
                    "A lot of write failures encountered. A write failure is a non-timeout exception encountered during a write request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.",
                  query:
                    'increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:failures:oneminuterate"}[1m]) > 0',
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestWriteFailure\r\n      expr: \'increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:failures:oneminuterate"}[1m]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request write failure (instance {{ $labels.instance }})\r\n        description: "A lot of write failures encountered. A write failure is a non-timeout exception encountered during a write request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra client request read failure",
                  description:
                    "A lot of read failures encountered. A read failure is a non-timeout exception encountered during a read request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.",
                  query:
                    'increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:failures:oneminuterate"}[1m]) > 0',
                  severity: "critical",
                  content:
                    '- alert: CassandraClientRequestReadFailure\r\n      expr: \'increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:failures:oneminuterate"}[1m]) > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra client request read failure (instance {{ $labels.instance }})\r\n        description: "A lot of read failures encountered. A read failure is a non-timeout exception encountered during a read request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cassandra cache hit rate key cache",
                  description: "Key cache hit rate is below 85%",
                  query:
                    'cassandra_stats{name="org:apache:cassandra:metrics:cache:keycache:hitrate:value"} < .85',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: CassandraCacheHitRateKeyCache\r\n      expr: \'cassandra_stats{name="org:apache:cassandra:metrics:cache:keycache:hitrate:value"} < .85\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cassandra cache hit rate key cache (instance {{ $labels.instance }})\r\n        description: "Key cache hit rate is below 85%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Clickhouse",
          exporters: [
            {
              name: "Embedded Exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://clickhouse.com/docs/en/operations/system-tables/metrics",
              rules: [
                {
                  name: "ClickHouse Memory Usage Critical",
                  description: "Memory usage is critically high, over 90%.",
                  query:
                    "ClickHouseAsyncMetrics_CGroupMemoryUsed / ClickHouseAsyncMetrics_CGroupMemoryTotal * 100 > 90",
                  severity: "critical",
                  for: "5m",
                  content:
                    "- alert: ClickhouseMemoryUsageCritical\r\n      expr: 'ClickHouseAsyncMetrics_CGroupMemoryUsed / ClickHouseAsyncMetrics_CGroupMemoryTotal * 100 > 90'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ClickHouse Memory Usage Critical (instance {{ $labels.instance }})\r\n        description: \"Memory usage is critically high, over 90%.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Memory Usage Warning",
                  description: "Memory usage is over 80%.",
                  query:
                    "ClickHouseAsyncMetrics_CGroupMemoryUsed / ClickHouseAsyncMetrics_CGroupMemoryTotal * 100 > 80",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: ClickhouseMemoryUsageWarning\r\n      expr: 'ClickHouseAsyncMetrics_CGroupMemoryUsed / ClickHouseAsyncMetrics_CGroupMemoryTotal * 100 > 80'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse Memory Usage Warning (instance {{ $labels.instance }})\r\n        description: \"Memory usage is over 80%.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Disk Space Low on Default",
                  description: "Disk space on default is below 20%.",
                  query:
                    "ClickHouseAsyncMetrics_DiskAvailable_default / (ClickHouseAsyncMetrics_DiskAvailable_default + ClickHouseAsyncMetrics_DiskUsed_default) * 100 < 20",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: ClickhouseDiskSpaceLowOnDefault\r\n      expr: 'ClickHouseAsyncMetrics_DiskAvailable_default / (ClickHouseAsyncMetrics_DiskAvailable_default + ClickHouseAsyncMetrics_DiskUsed_default) * 100 < 20'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse Disk Space Low on Default (instance {{ $labels.instance }})\r\n        description: \"Disk space on default is below 20%.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Disk Space Critical on Default",
                  description:
                    "Disk space on default disk is critically low, below 10%.",
                  query:
                    "ClickHouseAsyncMetrics_DiskAvailable_default / (ClickHouseAsyncMetrics_DiskAvailable_default + ClickHouseAsyncMetrics_DiskUsed_default) * 100 < 10",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: ClickhouseDiskSpaceCriticalOnDefault\r\n      expr: 'ClickHouseAsyncMetrics_DiskAvailable_default / (ClickHouseAsyncMetrics_DiskAvailable_default + ClickHouseAsyncMetrics_DiskUsed_default) * 100 < 10'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ClickHouse Disk Space Critical on Default (instance {{ $labels.instance }})\r\n        description: \"Disk space on default disk is critically low, below 10%.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Disk Space Low on Backups",
                  description: "Disk space on backups is below 20%.",
                  query:
                    "ClickHouseAsyncMetrics_DiskAvailable_backups / (ClickHouseAsyncMetrics_DiskAvailable_backups + ClickHouseAsyncMetrics_DiskUsed_backups) * 100 < 20",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: ClickhouseDiskSpaceLowOnBackups\r\n      expr: 'ClickHouseAsyncMetrics_DiskAvailable_backups / (ClickHouseAsyncMetrics_DiskAvailable_backups + ClickHouseAsyncMetrics_DiskUsed_backups) * 100 < 20'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse Disk Space Low on Backups (instance {{ $labels.instance }})\r\n        description: \"Disk space on backups is below 20%.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Replica Errors",
                  description:
                    "Critical replica errors detected, either all replicas are stale or lost.",
                  query:
                    "ClickHouseErrorMetric_ALL_REPLICAS_ARE_STALE == 1 or ClickHouseErrorMetric_ALL_REPLICAS_LOST == 1",
                  severity: "critical",
                  for: "0m",
                  content:
                    "- alert: ClickhouseReplicaErrors\r\n      expr: 'ClickHouseErrorMetric_ALL_REPLICAS_ARE_STALE == 1 or ClickHouseErrorMetric_ALL_REPLICAS_LOST == 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ClickHouse Replica Errors (instance {{ $labels.instance }})\r\n        description: \"Critical replica errors detected, either all replicas are stale or lost.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse No Available Replicas",
                  description: "No available replicas in ClickHouse.",
                  query: "ClickHouseErrorMetric_NO_AVAILABLE_REPLICA == 1",
                  severity: "critical",
                  for: "0m",
                  content:
                    "- alert: ClickhouseNoAvailableReplicas\r\n      expr: 'ClickHouseErrorMetric_NO_AVAILABLE_REPLICA == 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ClickHouse No Available Replicas (instance {{ $labels.instance }})\r\n        description: \"No available replicas in ClickHouse.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse No Live Replicas",
                  description:
                    "There are too few live replicas available, risking data loss and service disruption.",
                  query: "ClickHouseErrorMetric_TOO_FEW_LIVE_REPLICAS == 1",
                  severity: "critical",
                  for: "0m",
                  content:
                    "- alert: ClickhouseNoLiveReplicas\r\n      expr: 'ClickHouseErrorMetric_TOO_FEW_LIVE_REPLICAS == 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ClickHouse No Live Replicas (instance {{ $labels.instance }})\r\n        description: \"There are too few live replicas available, risking data loss and service disruption.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse High Network Traffic",
                  description:
                    "Network traffic is unusually high, may affect cluster performance.",
                  query:
                    "ClickHouseMetrics_NetworkSend > 250 or ClickHouseMetrics_NetworkReceive > 250",
                  severity: "warning",
                  for: "5m",
                  comments:
                    "Please replace the threshold with an appropriate value\n",
                  content:
                    "# Please replace the threshold with an appropriate value\r\n    - alert: ClickhouseHighNetworkTraffic\r\n      expr: 'ClickHouseMetrics_NetworkSend > 250 or ClickHouseMetrics_NetworkReceive > 250'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse High Network Traffic (instance {{ $labels.instance }})\r\n        description: \"Network traffic is unusually high, may affect cluster performance.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse High TCP Connections",
                  description:
                    "High number of TCP connections, indicating heavy client or inter-cluster communication.",
                  query: "ClickHouseMetrics_TCPConnection > 400",
                  severity: "warning",
                  for: "5m",
                  comments:
                    "Please replace the threshold with an appropriate value\n",
                  content:
                    "# Please replace the threshold with an appropriate value\r\n    - alert: ClickhouseHighTcpConnections\r\n      expr: 'ClickHouseMetrics_TCPConnection > 400'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse High TCP Connections (instance {{ $labels.instance }})\r\n        description: \"High number of TCP connections, indicating heavy client or inter-cluster communication.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Interserver Connection Issues",
                  description:
                    "An increase in interserver connections may indicate replication or distributed query handling issues.",
                  query:
                    "increase(ClickHouseMetrics_InterserverConnection[5m]) > 0",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: ClickhouseInterserverConnectionIssues\r\n      expr: 'increase(ClickHouseMetrics_InterserverConnection[5m]) > 0'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse Interserver Connection Issues (instance {{ $labels.instance }})\r\n        description: \"An increase in interserver connections may indicate replication or distributed query handling issues.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse ZooKeeper Connection Issues",
                  description:
                    "ClickHouse is experiencing issues with ZooKeeper connections, which may affect cluster state and coordination.",
                  query: "avg(ClickHouseMetrics_ZooKeeperSession) != 1",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: ClickhouseZookeeperConnectionIssues\r\n      expr: 'avg(ClickHouseMetrics_ZooKeeperSession) != 1'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ClickHouse ZooKeeper Connection Issues (instance {{ $labels.instance }})\r\n        description: \"ClickHouse is experiencing issues with ZooKeeper connections, which may affect cluster state and coordination.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Authentication Failures",
                  description:
                    "Authentication failures detected, indicating potential security issues or misconfiguration.",
                  query:
                    "increase(ClickHouseErrorMetric_AUTHENTICATION_FAILED[5m]) > 0",
                  severity: "info",
                  for: "0m",
                  content:
                    "- alert: ClickhouseAuthenticationFailures\r\n      expr: 'increase(ClickHouseErrorMetric_AUTHENTICATION_FAILED[5m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: ClickHouse Authentication Failures (instance {{ $labels.instance }})\r\n        description: \"Authentication failures detected, indicating potential security issues or misconfiguration.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ClickHouse Access Denied Errors",
                  description:
                    "Access denied errors have been logged, which could indicate permission issues or unauthorized access attempts.",
                  query:
                    "increase(ClickHouseErrorMetric_RESOURCE_ACCESS_DENIED[5m]) > 0",
                  severity: "info",
                  for: "0m",
                  content:
                    "- alert: ClickhouseAccessDeniedErrors\r\n      expr: 'increase(ClickHouseErrorMetric_RESOURCE_ACCESS_DENIED[5m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: ClickHouse Access Denied Errors (instance {{ $labels.instance }})\r\n        description: \"Access denied errors have been logged, which could indicate permission issues or unauthorized access attempts.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Zookeeper",
          exporters: [
            {
              name: "cloudflare/kafka_zookeeper_exporter",
              slug: "cloudflare-kafka-zookeeper-exporter",
              doc_url: "https://github.com/cloudflare/kafka_zookeeper_exporter",
              rules: null,
            },
            {
              name: "dabealu/zookeeper-exporter",
              slug: "dabealu-zookeeper-exporter",
              doc_url: "https://github.com/dabealu/zookeeper-exporter",
              rules: [
                {
                  name: "Zookeeper Down",
                  description:
                    "Zookeeper down on instance {{ $labels.instance }}",
                  query: "zk_up == 0",
                  severity: "critical",
                  content:
                    "- alert: ZookeeperDown\r\n      expr: 'zk_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Zookeeper Down (instance {{ $labels.instance }})\r\n        description: \"Zookeeper down on instance {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Zookeeper missing leader",
                  description: "Zookeeper cluster has no node marked as leader",
                  query: "sum(zk_server_leader) == 0",
                  severity: "critical",
                  content:
                    "- alert: ZookeeperMissingLeader\r\n      expr: 'sum(zk_server_leader) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Zookeeper missing leader (instance {{ $labels.instance }})\r\n        description: \"Zookeeper cluster has no node marked as leader\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Zookeeper Too Many Leaders",
                  description:
                    "Zookeeper cluster has too many nodes marked as leader",
                  query: "sum(zk_server_leader) > 1",
                  severity: "critical",
                  content:
                    "- alert: ZookeeperTooManyLeaders\r\n      expr: 'sum(zk_server_leader) > 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Zookeeper Too Many Leaders (instance {{ $labels.instance }})\r\n        description: \"Zookeeper cluster has too many nodes marked as leader\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Zookeeper Not Ok",
                  description: "Zookeeper instance is not ok",
                  query: "zk_ruok == 0",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: ZookeeperNotOk\r\n      expr: 'zk_ruok == 0'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Zookeeper Not Ok (instance {{ $labels.instance }})\r\n        description: \"Zookeeper instance is not ok\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Kafka",
          exporters: [
            {
              name: "danielqsj/kafka_exporter",
              slug: "danielqsj-kafka-exporter",
              doc_url: "https://github.com/danielqsj/kafka_exporter",
              rules: [
                {
                  name: "Kafka topics replicas",
                  description: "Kafka topic in-sync partition",
                  query:
                    "sum(kafka_topic_partition_in_sync_replica) by (topic) < 3",
                  severity: "critical",
                  content:
                    "- alert: KafkaTopicsReplicas\r\n      expr: 'sum(kafka_topic_partition_in_sync_replica) by (topic) < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kafka topics replicas (instance {{ $labels.instance }})\r\n        description: \"Kafka topic in-sync partition\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kafka consumers group",
                  description: "Kafka consumers group",
                  query: "sum(kafka_consumergroup_lag) by (consumergroup) > 50",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: KafkaConsumersGroup\r\n      expr: 'sum(kafka_consumergroup_lag) by (consumergroup) > 50'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kafka consumers group (instance {{ $labels.instance }})\r\n        description: \"Kafka consumers group\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
            {
              name: "linkedin/Burrow",
              slug: "linkedin-kafka-exporter",
              doc_url: "https://github.com/linkedin/Burrow",
              rules: [
                {
                  name: "Kafka topic offset decreased",
                  description: "Kafka topic offset has decreased",
                  query: "delta(kafka_burrow_partition_current_offset[1m]) < 0",
                  severity: "warning",
                  content:
                    "- alert: KafkaTopicOffsetDecreased\r\n      expr: 'delta(kafka_burrow_partition_current_offset[1m]) < 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kafka topic offset decreased (instance {{ $labels.instance }})\r\n        description: \"Kafka topic offset has decreased\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kafka consumer lag",
                  description:
                    "Kafka consumer has a 30 minutes and increasing lag",
                  query:
                    "kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset >= (kafka_burrow_topic_partition_offset offset 15m - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset offset 15m) AND kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset > 0",
                  severity: "warning",
                  for: "15m",
                  content:
                    "- alert: KafkaConsumerLag\r\n      expr: 'kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset >= (kafka_burrow_topic_partition_offset offset 15m - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset offset 15m) AND kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset > 0'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kafka consumer lag (instance {{ $labels.instance }})\r\n        description: \"Kafka consumer has a 30 minutes and increasing lag\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Pulsar",
          exporters: [
            {
              name: "embedded exporter",
              slug: "embedded-exporter",
              doc_url: "https://pulsar.apache.org/docs/reference-metrics/",
              rules: [
                {
                  name: "Pulsar subscription high number of backlog entries",
                  description:
                    "The number of subscription backlog entries is over 5k",
                  query:
                    "sum(pulsar_subscription_back_log) by (subscription) > 5000",
                  for: "1h",
                  severity: "warning",
                  content:
                    "- alert: PulsarSubscriptionHighNumberOfBacklogEntries\r\n      expr: 'sum(pulsar_subscription_back_log) by (subscription) > 5000'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Pulsar subscription high number of backlog entries (instance {{ $labels.instance }})\r\n        description: \"The number of subscription backlog entries is over 5k\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar subscription very high number of backlog entries",
                  description:
                    "The number of subscription backlog entries is over 100k",
                  query:
                    "sum(pulsar_subscription_back_log) by (subscription) > 100000",
                  for: "1h",
                  severity: "critical",
                  content:
                    "- alert: PulsarSubscriptionVeryHighNumberOfBacklogEntries\r\n      expr: 'sum(pulsar_subscription_back_log) by (subscription) > 100000'\r\n      for: 1h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar subscription very high number of backlog entries (instance {{ $labels.instance }})\r\n        description: \"The number of subscription backlog entries is over 100k\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar topic large backlog storage size",
                  description: "The topic backlog storage size is over 5 GB",
                  query:
                    "sum(pulsar_storage_size > 5*1024*1024*1024) by (topic)",
                  for: "1h",
                  severity: "warning",
                  content:
                    "- alert: PulsarTopicLargeBacklogStorageSize\r\n      expr: 'sum(pulsar_storage_size > 5*1024*1024*1024) by (topic)'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Pulsar topic large backlog storage size (instance {{ $labels.instance }})\r\n        description: \"The topic backlog storage size is over 5 GB\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar topic very large backlog storage size",
                  description: "The topic backlog storage size is over 20 GB",
                  query:
                    "sum(pulsar_storage_size > 20*1024*1024*1024) by (topic)",
                  for: "1h",
                  severity: "critical",
                  content:
                    "- alert: PulsarTopicVeryLargeBacklogStorageSize\r\n      expr: 'sum(pulsar_storage_size > 20*1024*1024*1024) by (topic)'\r\n      for: 1h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar topic very large backlog storage size (instance {{ $labels.instance }})\r\n        description: \"The topic backlog storage size is over 20 GB\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar high write latency",
                  description: "Messages cannot be written in a timely fashion",
                  query:
                    "sum(pulsar_storage_write_latency_overflow > 0) by (topic)",
                  for: "1h",
                  severity: "critical",
                  content:
                    "- alert: PulsarHighWriteLatency\r\n      expr: 'sum(pulsar_storage_write_latency_overflow > 0) by (topic)'\r\n      for: 1h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar high write latency (instance {{ $labels.instance }})\r\n        description: \"Messages cannot be written in a timely fashion\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar large message payload",
                  description: "Observing large message payload (> 1MB)",
                  query: "sum(pulsar_entry_size_overflow > 0) by (topic)",
                  for: "1h",
                  severity: "warning",
                  content:
                    "- alert: PulsarLargeMessagePayload\r\n      expr: 'sum(pulsar_entry_size_overflow > 0) by (topic)'\r\n      for: 1h\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Pulsar large message payload (instance {{ $labels.instance }})\r\n        description: \"Observing large message payload (> 1MB)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar high ledger disk usage",
                  description: "Observing Ledger Disk Usage (> 75%)",
                  query:
                    "sum(bookie_ledger_dir__pulsar_data_bookkeeper_ledgers_usage) by (kubernetes_pod_name) > 75",
                  for: "1h",
                  severity: "critical",
                  content:
                    "- alert: PulsarHighLedgerDiskUsage\r\n      expr: 'sum(bookie_ledger_dir__pulsar_data_bookkeeper_ledgers_usage) by (kubernetes_pod_name) > 75'\r\n      for: 1h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar high ledger disk usage (instance {{ $labels.instance }})\r\n        description: \"Observing Ledger Disk Usage (> 75%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar read only bookies",
                  description: "Observing Readonly Bookies",
                  query: "count(bookie_SERVER_STATUS{} == 0) by (pod)",
                  for: "5m",
                  severity: "critical",
                  content:
                    "- alert: PulsarReadOnlyBookies\r\n      expr: 'count(bookie_SERVER_STATUS{} == 0) by (pod)'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar read only bookies (instance {{ $labels.instance }})\r\n        description: \"Observing Readonly Bookies\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar high number of function errors",
                  description:
                    "Observing more than 10 Function errors per minute",
                  query:
                    "sum((rate(pulsar_function_user_exceptions_total{}[1m]) + rate(pulsar_function_system_exceptions_total{}[1m])) > 10) by (name)",
                  for: "1m",
                  severity: "critical",
                  content:
                    "- alert: PulsarHighNumberOfFunctionErrors\r\n      expr: 'sum((rate(pulsar_function_user_exceptions_total{}[1m]) + rate(pulsar_function_system_exceptions_total{}[1m])) > 10) by (name)'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar high number of function errors (instance {{ $labels.instance }})\r\n        description: \"Observing more than 10 Function errors per minute\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Pulsar high number of sink errors",
                  description: "Observing more than 10 Sink errors per minute",
                  query:
                    "sum(rate(pulsar_sink_sink_exceptions_total{}[1m]) > 10) by (name)",
                  for: "1m",
                  severity: "critical",
                  content:
                    "- alert: PulsarHighNumberOfSinkErrors\r\n      expr: 'sum(rate(pulsar_sink_sink_exceptions_total{}[1m]) > 10) by (name)'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Pulsar high number of sink errors (instance {{ $labels.instance }})\r\n        description: \"Observing more than 10 Sink errors per minute\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Nats",
          exporters: [
            {
              name: "nats-io/prometheus-nats-exporter",
              slug: "nats-exporter",
              doc_url: "https://github.com/nats-io/prometheus-nats-exporter",
              rules: [
                {
                  name: "Nats high connection count",
                  description:
                    "High number of NATS connections ({{ $value }}) for {{ $labels.instance }}",
                  query: "gnatsd_varz_connections > 100",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: NatsHighConnectionCount\r\n      expr: 'gnatsd_varz_connections > 100'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high connection count (instance {{ $labels.instance }})\r\n        description: \"High number of NATS connections ({{ $value }}) for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high pending bytes",
                  description:
                    "High number of NATS pending bytes ({{ $value }}) for {{ $labels.instance }}",
                  query: "gnatsd_connz_pending_bytes > 100000",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: NatsHighPendingBytes\r\n      expr: 'gnatsd_connz_pending_bytes > 100000'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high pending bytes (instance {{ $labels.instance }})\r\n        description: \"High number of NATS pending bytes ({{ $value }}) for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high subscriptions count",
                  description:
                    "High number of NATS subscriptions ({{ $value }}) for {{ $labels.instance }}",
                  query: "gnatsd_connz_subscriptions > 50",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: NatsHighSubscriptionsCount\r\n      expr: 'gnatsd_connz_subscriptions > 50'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high subscriptions count (instance {{ $labels.instance }})\r\n        description: \"High number of NATS subscriptions ({{ $value }}) for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high routes count",
                  description:
                    "High number of NATS routes ({{ $value }}) for {{ $labels.instance }}",
                  query: "gnatsd_varz_routes > 10",
                  severity: "warning",
                  for: "3m",
                  content:
                    "- alert: NatsHighRoutesCount\r\n      expr: 'gnatsd_varz_routes > 10'\r\n      for: 3m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high routes count (instance {{ $labels.instance }})\r\n        description: \"High number of NATS routes ({{ $value }}) for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high memory usage",
                  description:
                    "NATS server memory usage is above 200MB for {{ $labels.instance }}",
                  query: "gnatsd_varz_mem > 200 * 1024 * 1024",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighMemoryUsage\r\n      expr: 'gnatsd_varz_mem > 200 * 1024 * 1024'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high memory usage (instance {{ $labels.instance }})\r\n        description: \"NATS server memory usage is above 200MB for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats slow consumers",
                  description:
                    "There are slow consumers in NATS for {{ $labels.instance }}",
                  query: "gnatsd_varz_slow_consumers > 0",
                  severity: "critical",
                  for: "3m",
                  content:
                    "- alert: NatsSlowConsumers\r\n      expr: 'gnatsd_varz_slow_consumers > 0'\r\n      for: 3m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nats slow consumers (instance {{ $labels.instance }})\r\n        description: \"There are slow consumers in NATS for {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats server down",
                  description:
                    "NATS server has been down for more than 5 minutes",
                  query: 'absent(up{job="nats"})',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: NatsServerDown\r\n      expr: \'absent(up{job="nats"})\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nats server down (instance {{ $labels.instance }})\r\n        description: "NATS server has been down for more than 5 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Nats high CPU usage",
                  description:
                    "NATS server is using more than 80% CPU for the last 5 minutes",
                  query: "rate(gnatsd_varz_cpu[5m]) > 0.8",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighCpuUsage\r\n      expr: 'rate(gnatsd_varz_cpu[5m]) > 0.8'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high CPU usage (instance {{ $labels.instance }})\r\n        description: \"NATS server is using more than 80% CPU for the last 5 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high number of connections",
                  description:
                    "NATS server has more than 1000 active connections",
                  query: "gnatsd_connz_num_connections > 1000",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighNumberOfConnections\r\n      expr: 'gnatsd_connz_num_connections > 1000'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high number of connections (instance {{ $labels.instance }})\r\n        description: \"NATS server has more than 1000 active connections\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high JetStream store usage",
                  description: "JetStream store usage is over 80%",
                  query:
                    "gnatsd_varz_jetstream_stats_storage / gnatsd_varz_jetstream_config_max_storage > 0.8",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighJetstreamStoreUsage\r\n      expr: 'gnatsd_varz_jetstream_stats_storage / gnatsd_varz_jetstream_config_max_storage > 0.8'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high JetStream store usage (instance {{ $labels.instance }})\r\n        description: \"JetStream store usage is over 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high JetStream memory usage",
                  description: "JetStream memory usage is over 80%",
                  query:
                    "gnatsd_varz_jetstream_stats_memory / gnatsd_varz_jetstream_config_max_memory > 0.8",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighJetstreamMemoryUsage\r\n      expr: 'gnatsd_varz_jetstream_stats_memory / gnatsd_varz_jetstream_config_max_memory > 0.8'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high JetStream memory usage (instance {{ $labels.instance }})\r\n        description: \"JetStream memory usage is over 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high number of subscriptions",
                  description:
                    "NATS server has more than 1000 active subscriptions",
                  query: "gnatsd_connz_subscriptions > 1000",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighNumberOfSubscriptions\r\n      expr: 'gnatsd_connz_subscriptions > 1000'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high number of subscriptions (instance {{ $labels.instance }})\r\n        description: \"NATS server has more than 1000 active subscriptions\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats high pending bytes",
                  description:
                    "NATS server has more than 100,000 pending bytes",
                  query: "gnatsd_connz_pending_bytes > 100000",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsHighPendingBytes\r\n      expr: 'gnatsd_connz_pending_bytes > 100000'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats high pending bytes (instance {{ $labels.instance }})\r\n        description: \"NATS server has more than 100,000 pending bytes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats too many errors",
                  description:
                    "NATS server has encountered errors in the last 5 minutes",
                  query:
                    "increase(gnatsd_varz_jetstream_stats_api_errors[5m]) > 0",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsTooManyErrors\r\n      expr: 'increase(gnatsd_varz_jetstream_stats_api_errors[5m]) > 0'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats too many errors (instance {{ $labels.instance }})\r\n        description: \"NATS server has encountered errors in the last 5 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats JetStream consumers exceeded",
                  description: "JetStream has more than 100 active consumers",
                  query: "sum(gnatsd_varz_jetstream_stats_accounts) > 100",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsJetstreamConsumersExceeded\r\n      expr: 'sum(gnatsd_varz_jetstream_stats_accounts) > 100'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats JetStream consumers exceeded (instance {{ $labels.instance }})\r\n        description: \"JetStream has more than 100 active consumers\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats frequent authentication timeouts",
                  description:
                    "There have been more than 5 authentication timeouts in the last 5 minutes",
                  query: "increase(gnatsd_varz_auth_timeout[5m]) > 5",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsFrequentAuthenticationTimeouts\r\n      expr: 'increase(gnatsd_varz_auth_timeout[5m]) > 5'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats frequent authentication timeouts (instance {{ $labels.instance }})\r\n        description: \"There have been more than 5 authentication timeouts in the last 5 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats max payload size exceeded",
                  description:
                    "The max payload size allowed by NATS has been exceeded (1MB)",
                  query: "max(gnatsd_varz_max_payload) > 1024 * 1024",
                  severity: "critical",
                  for: "5m",
                  content:
                    "- alert: NatsMaxPayloadSizeExceeded\r\n      expr: 'max(gnatsd_varz_max_payload) > 1024 * 1024'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nats max payload size exceeded (instance {{ $labels.instance }})\r\n        description: \"The max payload size allowed by NATS has been exceeded (1MB)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats leaf node connection issue",
                  description:
                    "No leaf node connections have been established in the last 5 minutes",
                  query: "increase(gnatsd_varz_leafnodes[5m]) == 0",
                  severity: "critical",
                  for: "5m",
                  content:
                    "- alert: NatsLeafNodeConnectionIssue\r\n      expr: 'increase(gnatsd_varz_leafnodes[5m]) == 0'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nats leaf node connection issue (instance {{ $labels.instance }})\r\n        description: \"No leaf node connections have been established in the last 5 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats max ping operations exceeded",
                  description:
                    "The maximum number of ping operations in NATS has exceeded 50",
                  query: "gnatsd_varz_ping_max > 50",
                  severity: "warning",
                  for: "5m",
                  content:
                    "- alert: NatsMaxPingOperationsExceeded\r\n      expr: 'gnatsd_varz_ping_max > 50'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nats max ping operations exceeded (instance {{ $labels.instance }})\r\n        description: \"The maximum number of ping operations in NATS has exceeded 50\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nats write deadline exceeded",
                  description:
                    "The write deadline has been exceeded in NATS, indicating potential message delivery issues",
                  query: "gnatsd_varz_write_deadline > 10",
                  severity: "critical",
                  for: "5m",
                  content:
                    "- alert: NatsWriteDeadlineExceeded\r\n      expr: 'gnatsd_varz_write_deadline > 10'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nats write deadline exceeded (instance {{ $labels.instance }})\r\n        description: \"The write deadline has been exceeded in NATS, indicating potential message delivery issues\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Solr",
          exporters: [
            {
              name: "embedded exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://solr.apache.org/guide/8_11/monitoring-solr-with-prometheus-and-grafana.html",
              rules: [
                {
                  name: "Solr update errors",
                  description:
                    "Solr collection {{ $labels.collection }} has failed updates for replica {{ $labels.replica }} on {{ $labels.base_url }}.",
                  query:
                    "increase(solr_metrics_core_update_handler_errors_total[1m]) > 1",
                  severity: "critical",
                  content:
                    "- alert: SolrUpdateErrors\r\n      expr: 'increase(solr_metrics_core_update_handler_errors_total[1m]) > 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Solr update errors (instance {{ $labels.instance }})\r\n        description: \"Solr collection {{ $labels.collection }} has failed updates for replica {{ $labels.replica }} on {{ $labels.base_url }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Solr query errors",
                  description:
                    "Solr has increased query errors in collection {{ $labels.collection }} for replica {{ $labels.replica }} on {{ $labels.base_url }}.",
                  query:
                    'increase(solr_metrics_core_errors_total{category="QUERY"}[1m]) > 1',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: SolrQueryErrors\r\n      expr: \'increase(solr_metrics_core_errors_total{category="QUERY"}[1m]) > 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Solr query errors (instance {{ $labels.instance }})\r\n        description: "Solr has increased query errors in collection {{ $labels.collection }} for replica {{ $labels.replica }} on {{ $labels.base_url }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Solr replication errors",
                  description:
                    "Solr collection {{ $labels.collection }} has failed updates for replica {{ $labels.replica }} on {{ $labels.base_url }}.",
                  query:
                    'increase(solr_metrics_core_errors_total{category="REPLICATION"}[1m]) > 1',
                  severity: "critical",
                  content:
                    '- alert: SolrReplicationErrors\r\n      expr: \'increase(solr_metrics_core_errors_total{category="REPLICATION"}[1m]) > 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Solr replication errors (instance {{ $labels.instance }})\r\n        description: "Solr collection {{ $labels.collection }} has failed updates for replica {{ $labels.replica }} on {{ $labels.base_url }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Solr low live node count",
                  description:
                    "Solr collection {{ $labels.collection }} has less than two live nodes for replica {{ $labels.replica }} on {{ $labels.base_url }}.",
                  query: "solr_collections_live_nodes < 2",
                  severity: "critical",
                  content:
                    "- alert: SolrLowLiveNodeCount\r\n      expr: 'solr_collections_live_nodes < 2'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Solr low live node count (instance {{ $labels.instance }})\r\n        description: \"Solr collection {{ $labels.collection }} has less than two live nodes for replica {{ $labels.replica }} on {{ $labels.base_url }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Hadoop",
          exporters: [
            {
              name: "hadoop/jmx_exporter",
              slug: "jmx_exporter",
              doc_url: "https://github.com/prometheus/jmx_exporter",
              rules: [
                {
                  name: "Hadoop Name Node Down",
                  query: 'up{job="hadoop-namenode"} == 0',
                  for: "5m",
                  severity: "critical",
                  description: "The Hadoop NameNode service is unavailable.",
                  content:
                    '- alert: HadoopNameNodeDown\r\n      expr: \'up{job="hadoop-namenode"} == 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Hadoop Name Node Down (instance {{ $labels.instance }})\r\n        description: "The Hadoop NameNode service is unavailable.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Hadoop Resource Manager Down",
                  query: 'up{job="hadoop-resourcemanager"} == 0',
                  for: "5m",
                  severity: "critical",
                  description:
                    "The Hadoop ResourceManager service is unavailable.",
                  content:
                    '- alert: HadoopResourceManagerDown\r\n      expr: \'up{job="hadoop-resourcemanager"} == 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Hadoop Resource Manager Down (instance {{ $labels.instance }})\r\n        description: "The Hadoop ResourceManager service is unavailable.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Hadoop Data Node Out Of Service",
                  query: "hadoop_datanode_last_heartbeat == 0",
                  for: "10m",
                  severity: "warning",
                  description: "The Hadoop DataNode is not sending heartbeats.",
                  content:
                    "- alert: HadoopDataNodeOutOfService\r\n      expr: 'hadoop_datanode_last_heartbeat == 0'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop Data Node Out Of Service (instance {{ $labels.instance }})\r\n        description: \"The Hadoop DataNode is not sending heartbeats.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop HDFS Disk Space Low",
                  query:
                    "(hadoop_hdfs_bytes_total - hadoop_hdfs_bytes_used) / hadoop_hdfs_bytes_total < 0.1",
                  for: "15m",
                  severity: "warning",
                  description: "Available HDFS disk space is running low.",
                  content:
                    "- alert: HadoopHdfsDiskSpaceLow\r\n      expr: '(hadoop_hdfs_bytes_total - hadoop_hdfs_bytes_used) / hadoop_hdfs_bytes_total < 0.1'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop HDFS Disk Space Low (instance {{ $labels.instance }})\r\n        description: \"Available HDFS disk space is running low.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop Map Reduce Task Failures",
                  query: "hadoop_mapreduce_task_failures_total > 100",
                  for: "10m",
                  severity: "critical",
                  description:
                    "There is an unusually high number of MapReduce task failures.",
                  content:
                    "- alert: HadoopMapReduceTaskFailures\r\n      expr: 'hadoop_mapreduce_task_failures_total > 100'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Hadoop Map Reduce Task Failures (instance {{ $labels.instance }})\r\n        description: \"There is an unusually high number of MapReduce task failures.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop Resource Manager Memory High",
                  query:
                    "hadoop_resourcemanager_memory_bytes / hadoop_resourcemanager_memory_max_bytes > 0.8",
                  for: "15m",
                  severity: "warning",
                  description:
                    "The Hadoop ResourceManager is approaching its memory limit.",
                  content:
                    "- alert: HadoopResourceManagerMemoryHigh\r\n      expr: 'hadoop_resourcemanager_memory_bytes / hadoop_resourcemanager_memory_max_bytes > 0.8'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop Resource Manager Memory High (instance {{ $labels.instance }})\r\n        description: \"The Hadoop ResourceManager is approaching its memory limit.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop YARN Container Allocation Failures",
                  query: "hadoop_yarn_container_allocation_failures_total > 10",
                  for: "10m",
                  severity: "warning",
                  description:
                    "There is a significant number of YARN container allocation failures.",
                  content:
                    "- alert: HadoopYarnContainerAllocationFailures\r\n      expr: 'hadoop_yarn_container_allocation_failures_total > 10'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop YARN Container Allocation Failures (instance {{ $labels.instance }})\r\n        description: \"There is a significant number of YARN container allocation failures.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop HBase Region Count High",
                  query: "hadoop_hbase_region_count > 5000",
                  for: "15m",
                  severity: "warning",
                  description:
                    "The HBase cluster has an unusually high number of regions.",
                  content:
                    "- alert: HadoopHbaseRegionCountHigh\r\n      expr: 'hadoop_hbase_region_count > 5000'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop HBase Region Count High (instance {{ $labels.instance }})\r\n        description: \"The HBase cluster has an unusually high number of regions.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop HBase Region Server Heap Low",
                  query:
                    "hadoop_hbase_region_server_heap_bytes / hadoop_hbase_region_server_max_heap_bytes < 0.2",
                  for: "10m",
                  severity: "critical",
                  description:
                    "HBase Region Servers are running low on heap space.",
                  content:
                    "- alert: HadoopHbaseRegionServerHeapLow\r\n      expr: 'hadoop_hbase_region_server_heap_bytes / hadoop_hbase_region_server_max_heap_bytes < 0.2'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Hadoop HBase Region Server Heap Low (instance {{ $labels.instance }})\r\n        description: \"HBase Region Servers are running low on heap space.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Hadoop HBase Write Requests Latency High",
                  query: "hadoop_hbase_write_requests_latency_seconds > 0.5",
                  for: "10m",
                  severity: "warning",
                  description:
                    "HBase Write Requests are experiencing high latency.",
                  content:
                    "- alert: HadoopHbaseWriteRequestsLatencyHigh\r\n      expr: 'hadoop_hbase_write_requests_latency_seconds > 0.5'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Hadoop HBase Write Requests Latency High (instance {{ $labels.instance }})\r\n        description: \"HBase Write Requests are experiencing high latency.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Reverse proxies and load balancers",
      services: [
        {
          name: "Nginx",
          exporters: [
            {
              name: "knyar/nginx-lua-prometheus",
              slug: "knyar-nginx-exporter",
              doc_url: "https://github.com/knyar/nginx-lua-prometheus",
              rules: [
                {
                  name: "Nginx high HTTP 4xx error rate",
                  description: "Too many HTTP requests with status 4xx (> 5%)",
                  query:
                    'sum(rate(nginx_http_requests_total{status=~"^4.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: NginxHighHttp4xxErrorRate\r\n      expr: \'sum(rate(nginx_http_requests_total{status=~"^4.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nginx high HTTP 4xx error rate (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 4xx (> 5%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Nginx high HTTP 5xx error rate",
                  description: "Too many HTTP requests with status 5xx (> 5%)",
                  query:
                    'sum(rate(nginx_http_requests_total{status=~"^5.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: NginxHighHttp5xxErrorRate\r\n      expr: \'sum(rate(nginx_http_requests_total{status=~"^5.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Nginx high HTTP 5xx error rate (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 5xx (> 5%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Nginx latency high",
                  description: "Nginx p99 latency is higher than 3 seconds",
                  query:
                    "histogram_quantile(0.99, sum(rate(nginx_http_request_duration_seconds_bucket[2m])) by (host, node, le)) > 3",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: NginxLatencyHigh\r\n      expr: 'histogram_quantile(0.99, sum(rate(nginx_http_request_duration_seconds_bucket[2m])) by (host, node, le)) > 3'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nginx latency high (instance {{ $labels.instance }})\r\n        description: \"Nginx p99 latency is higher than 3 seconds\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Apache",
          exporters: [
            {
              name: "Lusitaniae/apache_exporter",
              slug: "lusitaniae-apache-exporter",
              doc_url: "https://github.com/Lusitaniae/apache_exporter",
              rules: [
                {
                  name: "Apache down",
                  description: "Apache down",
                  query: "apache_up == 0",
                  severity: "critical",
                  content:
                    "- alert: ApacheDown\r\n      expr: 'apache_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Apache down (instance {{ $labels.instance }})\r\n        description: \"Apache down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Apache workers load",
                  description:
                    "Apache workers in busy state approach the max workers count 80% workers busy on {{ $labels.instance }}",
                  query:
                    '(sum by (instance) (apache_workers{state="busy"}) / sum by (instance) (apache_scoreboard) ) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: ApacheWorkersLoad\r\n      expr: \'(sum by (instance) (apache_workers{state="busy"}) / sum by (instance) (apache_scoreboard) ) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Apache workers load (instance {{ $labels.instance }})\r\n        description: "Apache workers in busy state approach the max workers count 80% workers busy on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Apache restart",
                  description: "Apache has just been restarted.",
                  query: "apache_uptime_seconds_total / 60 < 1",
                  severity: "warning",
                  content:
                    "- alert: ApacheRestart\r\n      expr: 'apache_uptime_seconds_total / 60 < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Apache restart (instance {{ $labels.instance }})\r\n        description: \"Apache has just been restarted.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "HaProxy",
          exporters: [
            {
              name: "Embedded exporter (HAProxy >= v2)",
              slug: "embedded-exporter-v2",
              doc_url:
                "https://github.com/haproxy/haproxy/tree/master/contrib/prometheus-exporter",
              rules: [
                {
                  name: "HAProxy high HTTP 4xx error rate backend",
                  description:
                    "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}",
                  query:
                    '((sum by (proxy) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp4xxErrorRateBackend\r\n      expr: \'((sum by (proxy) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 4xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 5xx error rate backend",
                  description:
                    "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}",
                  query:
                    '((sum by (proxy) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp5xxErrorRateBackend\r\n      expr: \'((sum by (proxy) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 5xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 4xx error rate server",
                  description:
                    "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}",
                  query:
                    '((sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp4xxErrorRateServer\r\n      expr: \'((sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 4xx error rate server (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 5xx error rate server",
                  description:
                    "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}",
                  query:
                    '((sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp5xxErrorRateServer\r\n      expr: \'((sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 5xx error rate server (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy server response errors",
                  description:
                    "Too many response errors to {{ $labels.server }} server (> 5%).",
                  query:
                    "(sum by (server) (rate(haproxy_server_response_errors_total[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100 > 5",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: HaproxyServerResponseErrors\r\n      expr: '(sum by (server) (rate(haproxy_server_response_errors_total[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100 > 5'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy server response errors (instance {{ $labels.instance }})\r\n        description: \"Too many response errors to {{ $labels.server }} server (> 5%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy backend connection errors",
                  description:
                    "Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.",
                  query:
                    "(sum by (proxy) (rate(haproxy_backend_connection_errors_total[1m]))) > 100",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: HaproxyBackendConnectionErrors\r\n      expr: '(sum by (proxy) (rate(haproxy_backend_connection_errors_total[1m]))) > 100'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy backend connection errors (instance {{ $labels.instance }})\r\n        description: \"Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy server connection errors",
                  description:
                    "Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.",
                  query:
                    "(sum by (proxy) (rate(haproxy_server_connection_errors_total[1m]))) > 100",
                  severity: "critical",
                  content:
                    "- alert: HaproxyServerConnectionErrors\r\n      expr: '(sum by (proxy) (rate(haproxy_server_connection_errors_total[1m]))) > 100'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy server connection errors (instance {{ $labels.instance }})\r\n        description: \"Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy backend max active session > 80%",
                  description:
                    'Session limit from backend {{ $labels.proxy }} to server {{ $labels.server }} reached 80% of limit - {{ $value | printf "%.2f"}}%',
                  query:
                    "((haproxy_server_max_sessions >0) * 100) / (haproxy_server_limit_sessions > 0) > 80",
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HaproxyBackendMaxActiveSession>80%\r\n      expr: \'((haproxy_server_max_sessions >0) * 100) / (haproxy_server_limit_sessions > 0) > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy backend max active session > 80% (instance {{ $labels.instance }})\r\n        description: "Session limit from backend {{ $labels.proxy }} to server {{ $labels.server }} reached 80% of limit - {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy pending requests",
                  description:
                    'Some HAProxy requests are pending on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}',
                  query:
                    "sum by (proxy) (rate(haproxy_backend_current_queue[2m])) > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HaproxyPendingRequests\r\n      expr: \'sum by (proxy) (rate(haproxy_backend_current_queue[2m])) > 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy pending requests (instance {{ $labels.instance }})\r\n        description: "Some HAProxy requests are pending on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy HTTP slowing down",
                  description:
                    'Average request time is increasing - {{ $value | printf "%.2f"}}',
                  query:
                    "avg by (instance, proxy) (haproxy_backend_max_total_time_seconds) > 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: HaproxyHttpSlowingDown\r\n      expr: \'avg by (instance, proxy) (haproxy_backend_max_total_time_seconds) > 1\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy HTTP slowing down (instance {{ $labels.instance }})\r\n        description: "Average request time is increasing - {{ $value | printf "%.2f"}}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy retry high",
                  description:
                    'High rate of retry on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}',
                  query:
                    "sum by (proxy) (rate(haproxy_backend_retry_warnings_total[1m])) > 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: HaproxyRetryHigh\r\n      expr: \'sum by (proxy) (rate(haproxy_backend_retry_warnings_total[1m])) > 10\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy retry high (instance {{ $labels.instance }})\r\n        description: "High rate of retry on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAproxy has no alive backends",
                  description:
                    "HAProxy has no alive active or backup backends for {{ $labels.proxy }}",
                  query:
                    "haproxy_backend_active_servers + haproxy_backend_backup_servers == 0",
                  severity: "critical",
                  content:
                    "- alert: HaproxyHasNoAliveBackends\r\n      expr: 'haproxy_backend_active_servers + haproxy_backend_backup_servers == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAproxy has no alive backends (instance {{ $labels.instance }})\r\n        description: \"HAProxy has no alive active or backup backends for {{ $labels.proxy }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy frontend security blocked requests",
                  description:
                    "HAProxy is blocking requests for security reason",
                  query:
                    "sum by (proxy) (rate(haproxy_frontend_denied_connections_total[2m])) > 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: HaproxyFrontendSecurityBlockedRequests\r\n      expr: 'sum by (proxy) (rate(haproxy_frontend_denied_connections_total[2m])) > 10'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy frontend security blocked requests (instance {{ $labels.instance }})\r\n        description: \"HAProxy is blocking requests for security reason\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy server healthcheck failure",
                  description:
                    "Some server healthcheck are failing on {{ $labels.server }}",
                  query:
                    "increase(haproxy_server_check_failures_total[1m]) > 0",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: HaproxyServerHealthcheckFailure\r\n      expr: 'increase(haproxy_server_check_failures_total[1m]) > 0'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy server healthcheck failure (instance {{ $labels.instance }})\r\n        description: \"Some server healthcheck are failing on {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
            {
              name: "prometheus/haproxy_exporter (HAProxy < v2)",
              slug: "haproxy-exporter-v1",
              doc_url: "https://github.com/prometheus/haproxy_exporter",
              rules: [
                {
                  name: "HAProxy down",
                  description: "HAProxy down",
                  query: "haproxy_up == 0",
                  severity: "critical",
                  content:
                    "- alert: HaproxyDown\r\n      expr: 'haproxy_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy down (instance {{ $labels.instance }})\r\n        description: \"HAProxy down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy high HTTP 4xx error rate backend",
                  description:
                    "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}",
                  query:
                    'sum by (backend) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m])) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp4xxErrorRateBackend\r\n      expr: \'sum by (backend) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m])) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 4xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 5xx error rate backend",
                  description:
                    "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}",
                  query:
                    'sum by (backend) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m])) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp5xxErrorRateBackend\r\n      expr: \'sum by (backend) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m])) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 5xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 4xx error rate server",
                  description:
                    "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}",
                  query:
                    'sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp4xxErrorRateServer\r\n      expr: \'sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 4xx error rate server (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy high HTTP 5xx error rate server",
                  description:
                    "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}",
                  query:
                    'sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: HaproxyHighHttp5xxErrorRateServer\r\n      expr: \'sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy high HTTP 5xx error rate server (instance {{ $labels.instance }})\r\n        description: "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "HAProxy server response errors",
                  description:
                    "Too many response errors to {{ $labels.server }} server (> 5%).",
                  query:
                    "sum by (server) (rate(haproxy_server_response_errors_total[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: HaproxyServerResponseErrors\r\n      expr: 'sum by (server) (rate(haproxy_server_response_errors_total[1m]) * 100) / sum by (server) (rate(haproxy_server_http_responses_total[1m])) > 5'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy server response errors (instance {{ $labels.instance }})\r\n        description: \"Too many response errors to {{ $labels.server }} server (> 5%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy backend connection errors",
                  description:
                    "Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.",
                  query:
                    "sum by (backend) (rate(haproxy_backend_connection_errors_total[1m])) > 100",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: HaproxyBackendConnectionErrors\r\n      expr: 'sum by (backend) (rate(haproxy_backend_connection_errors_total[1m])) > 100'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy backend connection errors (instance {{ $labels.instance }})\r\n        description: \"Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy server connection errors",
                  description:
                    "Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.",
                  query:
                    "sum by (server) (rate(haproxy_server_connection_errors_total[1m])) > 100",
                  severity: "critical",
                  content:
                    "- alert: HaproxyServerConnectionErrors\r\n      expr: 'sum by (server) (rate(haproxy_server_connection_errors_total[1m])) > 100'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy server connection errors (instance {{ $labels.instance }})\r\n        description: \"Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy backend max active session",
                  description:
                    "HAproxy backend {{ $labels.fqdn }}/{{ $labels.backend }} is reaching session limit (> 80%).",
                  query:
                    "((sum by (backend) (avg_over_time(haproxy_backend_current_sessions[2m]) * 100) / sum by (backend) (avg_over_time(haproxy_backend_limit_sessions[2m])))) > 80",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: HaproxyBackendMaxActiveSession\r\n      expr: '((sum by (backend) (avg_over_time(haproxy_backend_current_sessions[2m]) * 100) / sum by (backend) (avg_over_time(haproxy_backend_limit_sessions[2m])))) > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy backend max active session (instance {{ $labels.instance }})\r\n        description: \"HAproxy backend {{ $labels.fqdn }}/{{ $labels.backend }} is reaching session limit (> 80%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy pending requests",
                  description:
                    "Some HAProxy requests are pending on {{ $labels.fqdn }}/{{ $labels.backend }} backend",
                  query: "sum by (backend) (haproxy_backend_current_queue) > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: HaproxyPendingRequests\r\n      expr: 'sum by (backend) (haproxy_backend_current_queue) > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy pending requests (instance {{ $labels.instance }})\r\n        description: \"Some HAProxy requests are pending on {{ $labels.fqdn }}/{{ $labels.backend }} backend\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy HTTP slowing down",
                  description: "Average request time is increasing",
                  query:
                    "avg by (backend) (haproxy_backend_http_total_time_average_seconds) > 1",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: HaproxyHttpSlowingDown\r\n      expr: 'avg by (backend) (haproxy_backend_http_total_time_average_seconds) > 1'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy HTTP slowing down (instance {{ $labels.instance }})\r\n        description: \"Average request time is increasing\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy retry high",
                  description:
                    "High rate of retry on {{ $labels.fqdn }}/{{ $labels.backend }} backend",
                  query:
                    "sum by (backend) (rate(haproxy_backend_retry_warnings_total[1m])) > 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: HaproxyRetryHigh\r\n      expr: 'sum by (backend) (rate(haproxy_backend_retry_warnings_total[1m])) > 10'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy retry high (instance {{ $labels.instance }})\r\n        description: \"High rate of retry on {{ $labels.fqdn }}/{{ $labels.backend }} backend\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy backend down",
                  description: "HAProxy backend is down",
                  query: "haproxy_backend_up == 0",
                  severity: "critical",
                  content:
                    "- alert: HaproxyBackendDown\r\n      expr: 'haproxy_backend_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy backend down (instance {{ $labels.instance }})\r\n        description: \"HAProxy backend is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy server down",
                  description: "HAProxy server is down",
                  query: "haproxy_server_up == 0",
                  severity: "critical",
                  content:
                    "- alert: HaproxyServerDown\r\n      expr: 'haproxy_server_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: HAProxy server down (instance {{ $labels.instance }})\r\n        description: \"HAProxy server is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy frontend security blocked requests",
                  description:
                    "HAProxy is blocking requests for security reason",
                  query:
                    "sum by (frontend) (rate(haproxy_frontend_requests_denied_total[2m])) > 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: HaproxyFrontendSecurityBlockedRequests\r\n      expr: 'sum by (frontend) (rate(haproxy_frontend_requests_denied_total[2m])) > 10'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy frontend security blocked requests (instance {{ $labels.instance }})\r\n        description: \"HAProxy is blocking requests for security reason\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "HAProxy server healthcheck failure",
                  description:
                    "Some server healthcheck are failing on {{ $labels.server }}",
                  query:
                    "increase(haproxy_server_check_failures_total[1m]) > 0",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: HaproxyServerHealthcheckFailure\r\n      expr: 'increase(haproxy_server_check_failures_total[1m]) > 0'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: HAProxy server healthcheck failure (instance {{ $labels.instance }})\r\n        description: \"Some server healthcheck are failing on {{ $labels.server }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Traefik",
          exporters: [
            {
              name: "Embedded exporter v2",
              slug: "embedded-exporter-v2",
              doc_url:
                "https://docs.traefik.io/observability/metrics/prometheus/",
              rules: [
                {
                  name: "Traefik service down",
                  description: "All Traefik services are down",
                  query: "count(traefik_service_server_up) by (service) == 0",
                  severity: "critical",
                  content:
                    "- alert: TraefikServiceDown\r\n      expr: 'count(traefik_service_server_up) by (service) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik service down (instance {{ $labels.instance }})\r\n        description: \"All Traefik services are down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Traefik high HTTP 4xx error rate service",
                  description: "Traefik service 4xx error rate is above 5%",
                  query:
                    'sum(rate(traefik_service_requests_total{code=~"4.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: TraefikHighHttp4xxErrorRateService\r\n      expr: \'sum(rate(traefik_service_requests_total{code=~"4.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik high HTTP 4xx error rate service (instance {{ $labels.instance }})\r\n        description: "Traefik service 4xx error rate is above 5%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Traefik high HTTP 5xx error rate service",
                  description: "Traefik service 5xx error rate is above 5%",
                  query:
                    'sum(rate(traefik_service_requests_total{code=~"5.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: TraefikHighHttp5xxErrorRateService\r\n      expr: \'sum(rate(traefik_service_requests_total{code=~"5.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik high HTTP 5xx error rate service (instance {{ $labels.instance }})\r\n        description: "Traefik service 5xx error rate is above 5%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Embedded exporter v1",
              slug: "embedded-exporter-v1",
              doc_url:
                "https://docs.traefik.io/observability/metrics/prometheus/",
              rules: [
                {
                  name: "Traefik backend down",
                  description: "All Traefik backends are down",
                  query: "count(traefik_backend_server_up) by (backend) == 0",
                  severity: "critical",
                  content:
                    "- alert: TraefikBackendDown\r\n      expr: 'count(traefik_backend_server_up) by (backend) == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik backend down (instance {{ $labels.instance }})\r\n        description: \"All Traefik backends are down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Traefik high HTTP 4xx error rate backend",
                  description: "Traefik backend 4xx error rate is above 5%",
                  query:
                    'sum(rate(traefik_backend_requests_total{code=~"4.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: TraefikHighHttp4xxErrorRateBackend\r\n      expr: \'sum(rate(traefik_backend_requests_total{code=~"4.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik high HTTP 4xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Traefik backend 4xx error rate is above 5%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Traefik high HTTP 5xx error rate backend",
                  description: "Traefik backend 5xx error rate is above 5%",
                  query:
                    'sum(rate(traefik_backend_requests_total{code=~"5.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: TraefikHighHttp5xxErrorRateBackend\r\n      expr: \'sum(rate(traefik_backend_requests_total{code=~"5.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Traefik high HTTP 5xx error rate backend (instance {{ $labels.instance }})\r\n        description: "Traefik backend 5xx error rate is above 5%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Runtimes",
      services: [
        {
          name: "PHP-FPM",
          exporters: [
            {
              name: "bakins/php-fpm-exporter",
              slug: "bakins-fpm-exporter",
              doc_url: "https://github.com/bakins/php-fpm-exporter",
              rules: [
                {
                  name: "PHP-FPM max-children reached",
                  description:
                    "PHP-FPM reached max children - {{ $labels.instance }}",
                  query:
                    "sum(phpfpm_max_children_reached_total) by (instance) > 0",
                  severity: "warning",
                  content:
                    "- alert: PhpfpmMaxchildrenReached\r\n      expr: 'sum(phpfpm_max_children_reached_total) by (instance) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: PHP-FPM max-children reached (instance {{ $labels.instance }})\r\n        description: \"PHP-FPM reached max children - {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "JVM",
          exporters: [
            {
              name: "java-client",
              slug: "jvm-exporter",
              doc_url: "https://github.com/prometheus/client_java",
              rules: [
                {
                  name: "JVM memory filling up",
                  description: "JVM memory is filling up (> 80%)",
                  query:
                    '(sum by (instance)(jvm_memory_used_bytes{area="heap"}) / sum by (instance)(jvm_memory_max_bytes{area="heap"})) * 100 > 80',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: JvmMemoryFillingUp\r\n      expr: \'(sum by (instance)(jvm_memory_used_bytes{area="heap"}) / sum by (instance)(jvm_memory_max_bytes{area="heap"})) * 100 > 80\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: JVM memory filling up (instance {{ $labels.instance }})\r\n        description: "JVM memory is filling up (> 80%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Sidekiq",
          exporters: [
            {
              name: "Strech/sidekiq-prometheus-exporter",
              slug: "strech-sidekiq-exporter",
              doc_url: "https://github.com/Strech/sidekiq-prometheus-exporter",
              rules: [
                {
                  name: "Sidekiq queue size",
                  description: "Sidekiq queue {{ $labels.name }} is growing",
                  query: "sidekiq_queue_size > 100",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: SidekiqQueueSize\r\n      expr: 'sidekiq_queue_size > 100'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Sidekiq queue size (instance {{ $labels.instance }})\r\n        description: \"Sidekiq queue {{ $labels.name }} is growing\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Sidekiq scheduling latency too high",
                  description:
                    "Sidekiq jobs are taking more than 1min to be picked up. Users may be seeing delays in background processing.",
                  query: "max(sidekiq_queue_latency) > 60",
                  severity: "critical",
                  content:
                    "- alert: SidekiqSchedulingLatencyTooHigh\r\n      expr: 'max(sidekiq_queue_latency) > 60'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Sidekiq scheduling latency too high (instance {{ $labels.instance }})\r\n        description: \"Sidekiq jobs are taking more than 1min to be picked up. Users may be seeing delays in background processing.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Orchestrators",
      services: [
        {
          name: "Kubernetes",
          exporters: [
            {
              name: "kube-state-metrics",
              slug: "kubestate-exporter",
              doc_url:
                "https://github.com/kubernetes/kube-state-metrics/tree/master/docs",
              rules: [
                {
                  name: "Kubernetes Node not ready",
                  summary: "Kubernetes Node ready (node {{ $labels.node }})",
                  description:
                    "Node {{ $labels.node }} has been unready for a long time",
                  query:
                    'kube_node_status_condition{condition="Ready",status="true"} == 0',
                  severity: "critical",
                  for: "10m",
                  content:
                    '- alert: KubernetesNodeNotReady\r\n      expr: \'kube_node_status_condition{condition="Ready",status="true"} == 0\'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes Node ready (node {{ $labels.node }})\r\n        description: "Node {{ $labels.node }} has been unready for a long time\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Node memory pressure",
                  summary:
                    "Kubernetes memory pressure (node {{ $labels.node }})",
                  description:
                    "Node {{ $labels.node }} has MemoryPressure condition",
                  query:
                    'kube_node_status_condition{condition="MemoryPressure",status="true"} == 1',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: KubernetesNodeMemoryPressure\r\n      expr: \'kube_node_status_condition{condition="MemoryPressure",status="true"} == 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes memory pressure (node {{ $labels.node }})\r\n        description: "Node {{ $labels.node }} has MemoryPressure condition\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Node disk pressure",
                  summary: "Kubernetes disk pressure (node {{ $labels.node }})",
                  description:
                    "Node {{ $labels.node }} has DiskPressure condition",
                  query:
                    'kube_node_status_condition{condition="DiskPressure",status="true"} == 1',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: KubernetesNodeDiskPressure\r\n      expr: \'kube_node_status_condition{condition="DiskPressure",status="true"} == 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes disk pressure (node {{ $labels.node }})\r\n        description: "Node {{ $labels.node }} has DiskPressure condition\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Node network unavailable",
                  description:
                    "Node {{ $labels.node }} has NetworkUnavailable condition",
                  query:
                    'kube_node_status_condition{condition="NetworkUnavailable",status="true"} == 1',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: KubernetesNodeNetworkUnavailable\r\n      expr: \'kube_node_status_condition{condition="NetworkUnavailable",status="true"} == 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes Node network unavailable (instance {{ $labels.instance }})\r\n        description: "Node {{ $labels.node }} has NetworkUnavailable condition\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Node out of pod capacity",
                  description: "Node {{ $labels.node }} is out of pod capacity",
                  query:
                    'sum by (node) ((kube_pod_status_phase{phase="Running"} == 1) + on(uid) group_left(node) (0 * kube_pod_info{pod_template_hash=""})) / sum by (node) (kube_node_status_allocatable{resource="pods"}) * 100 > 90',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: KubernetesNodeOutOfPodCapacity\r\n      expr: \'sum by (node) ((kube_pod_status_phase{phase="Running"} == 1) + on(uid) group_left(node) (0 * kube_pod_info{pod_template_hash=""})) / sum by (node) (kube_node_status_allocatable{resource="pods"}) * 100 > 90\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes Node out of pod capacity (instance {{ $labels.instance }})\r\n        description: "Node {{ $labels.node }} is out of pod capacity\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Container oom killer",
                  summary:
                    "Kubernetes container oom killer ({{ $labels.namespace }}/{{ $labels.pod }}:{{ $labels.container }})",
                  description:
                    "Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.",
                  query:
                    '(kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m >= 1) and ignoring (reason) min_over_time(kube_pod_container_status_last_terminated_reason{reason="OOMKilled"}[10m]) == 1',
                  severity: "warning",
                  content:
                    '- alert: KubernetesContainerOomKiller\r\n      expr: \'(kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m >= 1) and ignoring (reason) min_over_time(kube_pod_container_status_last_terminated_reason{reason="OOMKilled"}[10m]) == 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes container oom killer ({{ $labels.namespace }}/{{ $labels.pod }}:{{ $labels.container }})\r\n        description: "Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Job failed",
                  summary:
                    "Kubernetes Job failed ({{ $labels.namespace }}/{{ $labels.job_name }})",
                  description:
                    "Job {{ $labels.namespace }}/{{ $labels.job_name }} failed to complete",
                  query: "kube_job_status_failed > 0",
                  severity: "warning",
                  content:
                    "- alert: KubernetesJobFailed\r\n      expr: 'kube_job_status_failed > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes Job failed ({{ $labels.namespace }}/{{ $labels.job_name }})\r\n        description: \"Job {{ $labels.namespace }}/{{ $labels.job_name }} failed to complete\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Job not starting",
                  summary:
                    "Kubernetes Job not starting ({{ $labels.namespace }}/{{ $labels.job_name }})",
                  description:
                    "Job {{ $labels.namespace }}/{{ $labels.job_name }} did not start for 10 minutes",
                  query:
                    "kube_job_status_active == 0 and kube_job_status_failed == 0 and kube_job_status_succeeded == 0 and (time() - kube_job_status_start_time) > 600",
                  severity: "warning",
                  content:
                    "- alert: KubernetesJobNotStarting\r\n      expr: 'kube_job_status_active == 0 and kube_job_status_failed == 0 and kube_job_status_succeeded == 0 and (time() - kube_job_status_start_time) > 600'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes Job not starting ({{ $labels.namespace }}/{{ $labels.job_name }})\r\n        description: \"Job {{ $labels.namespace }}/{{ $labels.job_name }} did not start for 10 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes CronJob suspended",
                  summary:
                    "Kubernetes CronJob suspended ({{ $labels.namespace }}/{{ $labels.cronjob }})",
                  description:
                    "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is suspended",
                  query: "kube_cronjob_spec_suspend != 0",
                  severity: "warning",
                  content:
                    "- alert: KubernetesCronjobSuspended\r\n      expr: 'kube_cronjob_spec_suspend != 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes CronJob suspended ({{ $labels.namespace }}/{{ $labels.cronjob }})\r\n        description: \"CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is suspended\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes PersistentVolumeClaim pending",
                  summary:
                    "Kubernetes PersistentVolumeClaim pending ({{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }})",
                  description:
                    "PersistentVolumeClaim {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is pending",
                  query:
                    'kube_persistentvolumeclaim_status_phase{phase="Pending"} == 1',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: KubernetesPersistentvolumeclaimPending\r\n      expr: \'kube_persistentvolumeclaim_status_phase{phase="Pending"} == 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes PersistentVolumeClaim pending ({{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }})\r\n        description: "PersistentVolumeClaim {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is pending\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes Volume out of disk space",
                  description: "Volume is almost full (< 10% left)",
                  query:
                    "kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes * 100 < 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: KubernetesVolumeOutOfDiskSpace\r\n      expr: 'kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes * 100 < 10'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes Volume out of disk space (instance {{ $labels.instance }})\r\n        description: \"Volume is almost full (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Volume full in four days",
                  description:
                    "Volume under {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is expected to fill up within four days. Currently {{ $value | humanize }}% is available.",
                  query:
                    "predict_linear(kubelet_volume_stats_available_bytes[6h:5m], 4 * 24 * 3600) < 0",
                  severity: "critical",
                  content:
                    "- alert: KubernetesVolumeFullInFourDays\r\n      expr: 'predict_linear(kubelet_volume_stats_available_bytes[6h:5m], 4 * 24 * 3600) < 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes Volume full in four days (instance {{ $labels.instance }})\r\n        description: \"Volume under {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is expected to fill up within four days. Currently {{ $value | humanize }}% is available.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes PersistentVolume error",
                  summary:
                    "Kubernetes PersistentVolumeClaim pending ({{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }})",
                  description:
                    "Persistent volume {{ $labels.persistentvolume }} is in bad state",
                  query:
                    'kube_persistentvolume_status_phase{phase=~"Failed|Pending", job="kube-state-metrics"} > 0',
                  severity: "critical",
                  content:
                    '- alert: KubernetesPersistentvolumeError\r\n      expr: \'kube_persistentvolume_status_phase{phase=~"Failed|Pending", job="kube-state-metrics"} > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes PersistentVolumeClaim pending ({{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }})\r\n        description: "Persistent volume {{ $labels.persistentvolume }} is in bad state\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes StatefulSet down",
                  summary:
                    "Kubernetes StatefulSet down ({{ $labels.namespace }}/{{ $labels.statefulset }})",
                  description:
                    "StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} went down",
                  query:
                    "kube_statefulset_replicas != kube_statefulset_status_replicas_ready > 0",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: KubernetesStatefulsetDown\r\n      expr: 'kube_statefulset_replicas != kube_statefulset_status_replicas_ready > 0'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes StatefulSet down ({{ $labels.namespace }}/{{ $labels.statefulset }})\r\n        description: \"StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} went down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes HPA scale inability",
                  description:
                    "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is unable to scale",
                  query:
                    '(kube_horizontalpodautoscaler_spec_max_replicas - kube_horizontalpodautoscaler_status_desired_replicas) * on (horizontalpodautoscaler,namespace) (kube_horizontalpodautoscaler_status_condition{condition="ScalingLimited", status="true"} == 1) == 0',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: KubernetesHpaScaleInability\r\n      expr: \'(kube_horizontalpodautoscaler_spec_max_replicas - kube_horizontalpodautoscaler_status_desired_replicas) * on (horizontalpodautoscaler,namespace) (kube_horizontalpodautoscaler_status_condition{condition="ScalingLimited", status="true"} == 1) == 0\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes HPA scale inability (instance {{ $labels.instance }})\r\n        description: "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is unable to scale\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes HPA metrics unavailability",
                  description:
                    "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is unable to collect metrics",
                  query:
                    'kube_horizontalpodautoscaler_status_condition{status="false", condition="ScalingActive"} == 1',
                  severity: "warning",
                  content:
                    '- alert: KubernetesHpaMetricsUnavailability\r\n      expr: \'kube_horizontalpodautoscaler_status_condition{status="false", condition="ScalingActive"} == 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes HPA metrics unavailability (instance {{ $labels.instance }})\r\n        description: "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is unable to collect metrics\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes HPA scale maximum",
                  description:
                    "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} has hit maximum number of desired pods",
                  query:
                    "(kube_horizontalpodautoscaler_status_desired_replicas >= kube_horizontalpodautoscaler_spec_max_replicas) and (kube_horizontalpodautoscaler_spec_max_replicas > 1) and (kube_horizontalpodautoscaler_spec_min_replicas != kube_horizontalpodautoscaler_spec_max_replicas)",
                  severity: "info",
                  for: "2m",
                  content:
                    "- alert: KubernetesHpaScaleMaximum\r\n      expr: '(kube_horizontalpodautoscaler_status_desired_replicas >= kube_horizontalpodautoscaler_spec_max_replicas) and (kube_horizontalpodautoscaler_spec_max_replicas > 1) and (kube_horizontalpodautoscaler_spec_min_replicas != kube_horizontalpodautoscaler_spec_max_replicas)'\r\n      for: 2m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Kubernetes HPA scale maximum (instance {{ $labels.instance }})\r\n        description: \"HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} has hit maximum number of desired pods\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes HPA underutilized",
                  description:
                    "HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is constantly at minimum replicas for 50% of the time. Potential cost saving here.",
                  query:
                    "max(quantile_over_time(0.5, kube_horizontalpodautoscaler_status_desired_replicas[1d]) == kube_horizontalpodautoscaler_spec_min_replicas) by (horizontalpodautoscaler) > 3",
                  severity: "info",
                  content:
                    "- alert: KubernetesHpaUnderutilized\r\n      expr: 'max(quantile_over_time(0.5, kube_horizontalpodautoscaler_status_desired_replicas[1d]) == kube_horizontalpodautoscaler_spec_min_replicas) by (horizontalpodautoscaler) > 3'\r\n      for: 0m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Kubernetes HPA underutilized (instance {{ $labels.instance }})\r\n        description: \"HPA {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }} is constantly at minimum replicas for 50% of the time. Potential cost saving here.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Pod not healthy",
                  summary:
                    "Kubernetes Pod not healthy ({{ $labels.namespace }}/{{ $labels.pod }})",
                  description:
                    "Pod {{ $labels.namespace }}/{{ $labels.pod }} has been in a non-running state for longer than 15 minutes.",
                  query:
                    'sum by (namespace, pod) (kube_pod_status_phase{phase=~"Pending|Unknown|Failed"}) > 0',
                  severity: "critical",
                  for: "15m",
                  content:
                    '- alert: KubernetesPodNotHealthy\r\n      expr: \'sum by (namespace, pod) (kube_pod_status_phase{phase=~"Pending|Unknown|Failed"}) > 0\'\r\n      for: 15m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes Pod not healthy ({{ $labels.namespace }}/{{ $labels.pod }})\r\n        description: "Pod {{ $labels.namespace }}/{{ $labels.pod }} has been in a non-running state for longer than 15 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes pod crash looping",
                  summary:
                    "Kubernetes pod crash looping ({{ $labels.namespace }}/{{ $labels.pod }})",
                  description:
                    "Pod {{ $labels.namespace }}/{{ $labels.pod }} is crash looping",
                  query:
                    "increase(kube_pod_container_status_restarts_total[1m]) > 3",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: KubernetesPodCrashLooping\r\n      expr: 'increase(kube_pod_container_status_restarts_total[1m]) > 3'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes pod crash looping ({{ $labels.namespace }}/{{ $labels.pod }})\r\n        description: \"Pod {{ $labels.namespace }}/{{ $labels.pod }} is crash looping\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes ReplicaSet replicas mismatch",
                  summary:
                    "Kubernetes ReplicasSet mismatch ({{ $labels.namespace }}/{{ $labels.replicaset }})",
                  description:
                    "ReplicaSet {{ $labels.namespace }}/{{ $labels.replicaset }} replicas mismatch",
                  query:
                    "kube_replicaset_spec_replicas != kube_replicaset_status_ready_replicas",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: KubernetesReplicasetReplicasMismatch\r\n      expr: 'kube_replicaset_spec_replicas != kube_replicaset_status_ready_replicas'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes ReplicasSet mismatch ({{ $labels.namespace }}/{{ $labels.replicaset }})\r\n        description: \"ReplicaSet {{ $labels.namespace }}/{{ $labels.replicaset }} replicas mismatch\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Deployment replicas mismatch",
                  summary:
                    "Kubernetes Deployment replicas mismatch ({{ $labels.namespace }}/{{ $labels.deployment }})",
                  description:
                    "Deployment {{ $labels.namespace }}/{{ $labels.deployment }} replicas mismatch",
                  query:
                    "kube_deployment_spec_replicas != kube_deployment_status_replicas_available",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: KubernetesDeploymentReplicasMismatch\r\n      expr: 'kube_deployment_spec_replicas != kube_deployment_status_replicas_available'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes Deployment replicas mismatch ({{ $labels.namespace }}/{{ $labels.deployment }})\r\n        description: \"Deployment {{ $labels.namespace }}/{{ $labels.deployment }} replicas mismatch\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes StatefulSet replicas mismatch",
                  description:
                    "StatefulSet does not match the expected number of replicas.",
                  query:
                    "kube_statefulset_status_replicas_ready != kube_statefulset_status_replicas",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: KubernetesStatefulsetReplicasMismatch\r\n      expr: 'kube_statefulset_status_replicas_ready != kube_statefulset_status_replicas'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes StatefulSet replicas mismatch (instance {{ $labels.instance }})\r\n        description: \"StatefulSet does not match the expected number of replicas.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Deployment generation mismatch",
                  summary:
                    "Kubernetes Deployment generation mismatch ({{ $labels.namespace }}/{{ $labels.deployment }})",
                  description:
                    "Deployment {{ $labels.namespace }}/{{ $labels.deployment }} has failed but has not been rolled back.",
                  query:
                    "kube_deployment_status_observed_generation != kube_deployment_metadata_generation",
                  severity: "critical",
                  for: "10m",
                  content:
                    "- alert: KubernetesDeploymentGenerationMismatch\r\n      expr: 'kube_deployment_status_observed_generation != kube_deployment_metadata_generation'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes Deployment generation mismatch ({{ $labels.namespace }}/{{ $labels.deployment }})\r\n        description: \"Deployment {{ $labels.namespace }}/{{ $labels.deployment }} has failed but has not been rolled back.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes StatefulSet generation mismatch",
                  summary:
                    "Kubernetes StatefulSet generation mismatch ({{ $labels.namespace }}/{{ $labels.statefulset }})",
                  description:
                    "StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} has failed but has not been rolled back.",
                  query:
                    "kube_statefulset_status_observed_generation != kube_statefulset_metadata_generation",
                  severity: "critical",
                  for: "10m",
                  content:
                    "- alert: KubernetesStatefulsetGenerationMismatch\r\n      expr: 'kube_statefulset_status_observed_generation != kube_statefulset_metadata_generation'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes StatefulSet generation mismatch ({{ $labels.namespace }}/{{ $labels.statefulset }})\r\n        description: \"StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} has failed but has not been rolled back.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes StatefulSet update not rolled out",
                  summary:
                    "Kubernetes StatefulSet update not rolled out ({{ $labels.namespace }}/{{ $labels.statefulset }})",
                  description:
                    "StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} update has not been rolled out.",
                  query:
                    "max without (revision) (kube_statefulset_status_current_revision unless kube_statefulset_status_update_revision) * (kube_statefulset_replicas != kube_statefulset_status_replicas_updated)",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: KubernetesStatefulsetUpdateNotRolledOut\r\n      expr: 'max without (revision) (kube_statefulset_status_current_revision unless kube_statefulset_status_update_revision) * (kube_statefulset_replicas != kube_statefulset_status_replicas_updated)'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes StatefulSet update not rolled out ({{ $labels.namespace }}/{{ $labels.statefulset }})\r\n        description: \"StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} update has not been rolled out.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes DaemonSet rollout stuck",
                  summary:
                    "Kubernetes DaemonSet rollout stuck ({{ $labels.namespace }}/{{ $labels.daemonset }})",
                  description:
                    "Some Pods of DaemonSet {{ $labels.namespace }}/{{ $labels.daemonset }} are not scheduled or not ready",
                  query:
                    "kube_daemonset_status_number_ready / kube_daemonset_status_desired_number_scheduled * 100 < 100 or kube_daemonset_status_desired_number_scheduled - kube_daemonset_status_current_number_scheduled > 0",
                  severity: "warning",
                  for: "10m",
                  content:
                    "- alert: KubernetesDaemonsetRolloutStuck\r\n      expr: 'kube_daemonset_status_number_ready / kube_daemonset_status_desired_number_scheduled * 100 < 100 or kube_daemonset_status_desired_number_scheduled - kube_daemonset_status_current_number_scheduled > 0'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes DaemonSet rollout stuck ({{ $labels.namespace }}/{{ $labels.daemonset }})\r\n        description: \"Some Pods of DaemonSet {{ $labels.namespace }}/{{ $labels.daemonset }} are not scheduled or not ready\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes DaemonSet misscheduled",
                  summary:
                    "Kubernetes DaemonSet misscheduled ({{ $labels.namespace }}/{{ $labels.daemonset }})",
                  description:
                    "Some Pods of DaemonSet {{ $labels.namespace }}/{{ $labels.daemonset }} are running where they are not supposed to run",
                  query: "kube_daemonset_status_number_misscheduled > 0",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: KubernetesDaemonsetMisscheduled\r\n      expr: 'kube_daemonset_status_number_misscheduled > 0'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes DaemonSet misscheduled ({{ $labels.namespace }}/{{ $labels.daemonset }})\r\n        description: \"Some Pods of DaemonSet {{ $labels.namespace }}/{{ $labels.daemonset }} are running where they are not supposed to run\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes CronJob too long",
                  summary:
                    "Kubernetes CronJob too long ({{ $labels.namespace }}/{{ $labels.cronjob }})",
                  description:
                    "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is taking more than 1h to complete.",
                  query: "time() - kube_cronjob_next_schedule_time > 3600",
                  severity: "warning",
                  comments:
                    "Threshold should be customized for each cronjob name.\n",
                  content:
                    "# Threshold should be customized for each cronjob name.\r\n    - alert: KubernetesCronjobTooLong\r\n      expr: 'time() - kube_cronjob_next_schedule_time > 3600'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes CronJob too long ({{ $labels.namespace }}/{{ $labels.cronjob }})\r\n        description: \"CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is taking more than 1h to complete.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes Job slow completion",
                  summary:
                    "Kubernetes job slow completion ({{ $labels.namespace }}/{{ $labels.job_name }})",
                  description:
                    "Kubernetes Job {{ $labels.namespace }}/{{ $labels.job_name }} did not complete in time.",
                  query:
                    "kube_job_spec_completions - kube_job_status_succeeded - kube_job_status_failed > 0",
                  severity: "critical",
                  for: "12h",
                  content:
                    "- alert: KubernetesJobSlowCompletion\r\n      expr: 'kube_job_spec_completions - kube_job_status_succeeded - kube_job_status_failed > 0'\r\n      for: 12h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes job slow completion ({{ $labels.namespace }}/{{ $labels.job_name }})\r\n        description: \"Kubernetes Job {{ $labels.namespace }}/{{ $labels.job_name }} did not complete in time.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Kubernetes API server errors",
                  description:
                    "Kubernetes API server is experiencing high error rate",
                  query:
                    'sum(rate(apiserver_request_total{job="apiserver",code=~"(?:5..)"}[1m])) by (instance, job) / sum(rate(apiserver_request_total{job="apiserver"}[1m])) by (instance, job) * 100 > 3',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: KubernetesApiServerErrors\r\n      expr: \'sum(rate(apiserver_request_total{job="apiserver",code=~"(?:5..)"}[1m])) by (instance, job) / sum(rate(apiserver_request_total{job="apiserver"}[1m])) by (instance, job) * 100 > 3\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes API server errors (instance {{ $labels.instance }})\r\n        description: "Kubernetes API server is experiencing high error rate\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes API client errors",
                  description:
                    "Kubernetes API client is experiencing high error rate",
                  query:
                    '(sum(rate(rest_client_requests_total{code=~"(4|5).."}[1m])) by (instance, job) / sum(rate(rest_client_requests_total[1m])) by (instance, job)) * 100 > 1',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: KubernetesApiClientErrors\r\n      expr: \'(sum(rate(rest_client_requests_total{code=~"(4|5).."}[1m])) by (instance, job) / sum(rate(rest_client_requests_total[1m])) by (instance, job)) * 100 > 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes API client errors (instance {{ $labels.instance }})\r\n        description: "Kubernetes API client is experiencing high error rate\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes client certificate expires next week",
                  description:
                    "A client certificate used to authenticate to the apiserver is expiring next week.",
                  query:
                    'apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 7*24*60*60',
                  severity: "warning",
                  content:
                    '- alert: KubernetesClientCertificateExpiresNextWeek\r\n      expr: \'apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 7*24*60*60\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes client certificate expires next week (instance {{ $labels.instance }})\r\n        description: "A client certificate used to authenticate to the apiserver is expiring next week.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes client certificate expires soon",
                  description:
                    "A client certificate used to authenticate to the apiserver is expiring in less than 24.0 hours.",
                  query:
                    'apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 24*60*60',
                  severity: "critical",
                  content:
                    '- alert: KubernetesClientCertificateExpiresSoon\r\n      expr: \'apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 24*60*60\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Kubernetes client certificate expires soon (instance {{ $labels.instance }})\r\n        description: "A client certificate used to authenticate to the apiserver is expiring in less than 24.0 hours.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Kubernetes API server latency",
                  description:
                    "Kubernetes API server has a 99th percentile latency of {{ $value }} seconds for {{ $labels.verb }} {{ $labels.resource }}.",
                  query:
                    'histogram_quantile(0.99, sum(rate(apiserver_request_duration_seconds_bucket{verb!~"(?:CONNECT|WATCHLIST|WATCH|PROXY)"} [10m])) WITHOUT (subresource)) > 1',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: KubernetesApiServerLatency\r\n      expr: \'histogram_quantile(0.99, sum(rate(apiserver_request_duration_seconds_bucket{verb!~"(?:CONNECT|WATCHLIST|WATCH|PROXY)"} [10m])) WITHOUT (subresource)) > 1\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Kubernetes API server latency (instance {{ $labels.instance }})\r\n        description: "Kubernetes API server has a 99th percentile latency of {{ $value }} seconds for {{ $labels.verb }} {{ $labels.resource }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Nomad",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Nomad job failed",
                  description: "Nomad job failed",
                  query: "nomad_nomad_job_summary_failed > 0",
                  severity: "warning",
                  content:
                    "- alert: NomadJobFailed\r\n      expr: 'nomad_nomad_job_summary_failed > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nomad job failed (instance {{ $labels.instance }})\r\n        description: \"Nomad job failed\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nomad job lost",
                  description: "Nomad job lost",
                  query: "nomad_nomad_job_summary_lost > 0",
                  severity: "warning",
                  content:
                    "- alert: NomadJobLost\r\n      expr: 'nomad_nomad_job_summary_lost > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nomad job lost (instance {{ $labels.instance }})\r\n        description: \"Nomad job lost\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nomad job queued",
                  description: "Nomad job queued",
                  query: "nomad_nomad_job_summary_queued > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: NomadJobQueued\r\n      expr: 'nomad_nomad_job_summary_queued > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nomad job queued (instance {{ $labels.instance }})\r\n        description: \"Nomad job queued\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Nomad blocked evaluation",
                  description: "Nomad blocked evaluation",
                  query: "nomad_nomad_blocked_evals_total_blocked > 0",
                  severity: "warning",
                  content:
                    "- alert: NomadBlockedEvaluation\r\n      expr: 'nomad_nomad_blocked_evals_total_blocked > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Nomad blocked evaluation (instance {{ $labels.instance }})\r\n        description: \"Nomad blocked evaluation\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Consul",
          exporters: [
            {
              name: "prometheus/consul_exporter",
              slug: "consul-exporter",
              doc_url: "https://github.com/prometheus/consul_exporter",
              rules: [
                {
                  name: "Consul service healthcheck failed",
                  description:
                    "Service: `{{ $labels.service_name }}` Healthcheck: `{{ $labels.service_id }}`",
                  query: "consul_catalog_service_node_healthy == 0",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: ConsulServiceHealthcheckFailed\r\n      expr: 'consul_catalog_service_node_healthy == 0'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Consul service healthcheck failed (instance {{ $labels.instance }})\r\n        description: \"Service: `{{ $labels.service_name }}` Healthcheck: `{{ $labels.service_id }}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Consul missing master node",
                  description:
                    "Numbers of consul raft peers should be 3, in order to preserve quorum.",
                  query: "consul_raft_peers < 3",
                  severity: "critical",
                  content:
                    "- alert: ConsulMissingMasterNode\r\n      expr: 'consul_raft_peers < 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Consul missing master node (instance {{ $labels.instance }})\r\n        description: \"Numbers of consul raft peers should be 3, in order to preserve quorum.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Consul agent unhealthy",
                  description: "A Consul agent is down",
                  query: 'consul_health_node_status{status="critical"} == 1',
                  severity: "critical",
                  content:
                    '- alert: ConsulAgentUnhealthy\r\n      expr: \'consul_health_node_status{status="critical"} == 1\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Consul agent unhealthy (instance {{ $labels.instance }})\r\n        description: "A Consul agent is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Etcd",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Etcd insufficient Members",
                  description:
                    "Etcd cluster should have an odd number of members",
                  query: "count(etcd_server_id) % 2 == 0",
                  severity: "critical",
                  content:
                    "- alert: EtcdInsufficientMembers\r\n      expr: 'count(etcd_server_id) % 2 == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Etcd insufficient Members (instance {{ $labels.instance }})\r\n        description: \"Etcd cluster should have an odd number of members\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd no Leader",
                  description: "Etcd cluster have no leader",
                  query: "etcd_server_has_leader == 0",
                  severity: "critical",
                  content:
                    "- alert: EtcdNoLeader\r\n      expr: 'etcd_server_has_leader == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Etcd no Leader (instance {{ $labels.instance }})\r\n        description: \"Etcd cluster have no leader\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high number of leader changes",
                  description:
                    "Etcd leader changed more than 2 times during 10 minutes",
                  query:
                    "increase(etcd_server_leader_changes_seen_total[10m]) > 2",
                  severity: "warning",
                  content:
                    "- alert: EtcdHighNumberOfLeaderChanges\r\n      expr: 'increase(etcd_server_leader_changes_seen_total[10m]) > 2'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high number of leader changes (instance {{ $labels.instance }})\r\n        description: \"Etcd leader changed more than 2 times during 10 minutes\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high number of failed GRPC requests",
                  description:
                    "More than 1% GRPC request failure detected in Etcd",
                  query:
                    'sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.01',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: EtcdHighNumberOfFailedGrpcRequests\r\n      expr: \'sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.01\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high number of failed GRPC requests (instance {{ $labels.instance }})\r\n        description: "More than 1% GRPC request failure detected in Etcd\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Etcd high number of failed GRPC requests",
                  description:
                    "More than 5% GRPC request failure detected in Etcd",
                  query:
                    'sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.05',
                  severity: "critical",
                  for: "2m",
                  content:
                    '- alert: EtcdHighNumberOfFailedGrpcRequests\r\n      expr: \'sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.05\'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Etcd high number of failed GRPC requests (instance {{ $labels.instance }})\r\n        description: "More than 5% GRPC request failure detected in Etcd\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Etcd GRPC requests slow",
                  description:
                    "GRPC requests slowing down, 99th percentile is over 0.15s",
                  query:
                    'histogram_quantile(0.99, sum(rate(grpc_server_handling_seconds_bucket{grpc_type="unary"}[1m])) by (grpc_service, grpc_method, le)) > 0.15',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: EtcdGrpcRequestsSlow\r\n      expr: \'histogram_quantile(0.99, sum(rate(grpc_server_handling_seconds_bucket{grpc_type="unary"}[1m])) by (grpc_service, grpc_method, le)) > 0.15\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd GRPC requests slow (instance {{ $labels.instance }})\r\n        description: "GRPC requests slowing down, 99th percentile is over 0.15s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Etcd high number of failed HTTP requests",
                  description: "More than 1% HTTP failure detected in Etcd",
                  query:
                    "sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.01",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdHighNumberOfFailedHttpRequests\r\n      expr: 'sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.01'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high number of failed HTTP requests (instance {{ $labels.instance }})\r\n        description: \"More than 1% HTTP failure detected in Etcd\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high number of failed HTTP requests",
                  description: "More than 5% HTTP failure detected in Etcd",
                  query:
                    "sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.05",
                  severity: "critical",
                  for: "2m",
                  content:
                    "- alert: EtcdHighNumberOfFailedHttpRequests\r\n      expr: 'sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.05'\r\n      for: 2m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Etcd high number of failed HTTP requests (instance {{ $labels.instance }})\r\n        description: \"More than 5% HTTP failure detected in Etcd\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd HTTP requests slow",
                  description:
                    "HTTP requests slowing down, 99th percentile is over 0.15s",
                  query:
                    "histogram_quantile(0.99, rate(etcd_http_successful_duration_seconds_bucket[1m])) > 0.15",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdHttpRequestsSlow\r\n      expr: 'histogram_quantile(0.99, rate(etcd_http_successful_duration_seconds_bucket[1m])) > 0.15'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd HTTP requests slow (instance {{ $labels.instance }})\r\n        description: \"HTTP requests slowing down, 99th percentile is over 0.15s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd member communication slow",
                  description:
                    "Etcd member communication slowing down, 99th percentile is over 0.15s",
                  query:
                    "histogram_quantile(0.99, rate(etcd_network_peer_round_trip_time_seconds_bucket[1m])) > 0.15",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdMemberCommunicationSlow\r\n      expr: 'histogram_quantile(0.99, rate(etcd_network_peer_round_trip_time_seconds_bucket[1m])) > 0.15'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd member communication slow (instance {{ $labels.instance }})\r\n        description: \"Etcd member communication slowing down, 99th percentile is over 0.15s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high number of failed proposals",
                  description:
                    "Etcd server got more than 5 failed proposals past hour",
                  query: "increase(etcd_server_proposals_failed_total[1h]) > 5",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdHighNumberOfFailedProposals\r\n      expr: 'increase(etcd_server_proposals_failed_total[1h]) > 5'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high number of failed proposals (instance {{ $labels.instance }})\r\n        description: \"Etcd server got more than 5 failed proposals past hour\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high fsync durations",
                  description:
                    "Etcd WAL fsync duration increasing, 99th percentile is over 0.5s",
                  query:
                    "histogram_quantile(0.99, rate(etcd_disk_wal_fsync_duration_seconds_bucket[1m])) > 0.5",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdHighFsyncDurations\r\n      expr: 'histogram_quantile(0.99, rate(etcd_disk_wal_fsync_duration_seconds_bucket[1m])) > 0.5'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high fsync durations (instance {{ $labels.instance }})\r\n        description: \"Etcd WAL fsync duration increasing, 99th percentile is over 0.5s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Etcd high commit durations",
                  description:
                    "Etcd commit duration increasing, 99th percentile is over 0.25s",
                  query:
                    "histogram_quantile(0.99, rate(etcd_disk_backend_commit_duration_seconds_bucket[1m])) > 0.25",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: EtcdHighCommitDurations\r\n      expr: 'histogram_quantile(0.99, rate(etcd_disk_backend_commit_duration_seconds_bucket[1m])) > 0.25'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Etcd high commit durations (instance {{ $labels.instance }})\r\n        description: \"Etcd commit duration increasing, 99th percentile is over 0.25s\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Linkerd",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url: "https://linkerd.io/2/tasks/exporting-metrics/",
              rules: [
                {
                  name: "Linkerd high error rate",
                  description:
                    "Linkerd error rate for {{ $labels.deployment | $labels.statefulset | $labels.daemonset }} is over 10%",
                  query:
                    "sum(rate(request_errors_total[1m])) by (deployment, statefulset, daemonset) / sum(rate(request_total[1m])) by (deployment, statefulset, daemonset) * 100 > 10",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: LinkerdHighErrorRate\r\n      expr: 'sum(rate(request_errors_total[1m])) by (deployment, statefulset, daemonset) / sum(rate(request_total[1m])) by (deployment, statefulset, daemonset) * 100 > 10'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Linkerd high error rate (instance {{ $labels.instance }})\r\n        description: \"Linkerd error rate for {{ $labels.deployment | $labels.statefulset | $labels.daemonset }} is over 10%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Istio",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://istio.io/latest/docs/tasks/observability/metrics/querying-metrics/",
              rules: [
                {
                  name: "Istio Kubernetes gateway availability drop",
                  description:
                    "Gateway pods have dropped. Inbound traffic will likely be affected.",
                  query:
                    'min(kube_deployment_status_replicas_available{deployment="istio-ingressgateway", namespace="istio-system"}) without (instance, pod) < 2',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: IstioKubernetesGatewayAvailabilityDrop\r\n      expr: \'min(kube_deployment_status_replicas_available{deployment="istio-ingressgateway", namespace="istio-system"}) without (instance, pod) < 2\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio Kubernetes gateway availability drop (instance {{ $labels.instance }})\r\n        description: "Gateway pods have dropped. Inbound traffic will likely be affected.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio Pilot high total request rate",
                  description:
                    "Number of Istio Pilot push errors is too high (> 5%). Envoy sidecars might have outdated configuration.",
                  query:
                    "sum(rate(pilot_xds_push_errors[1m])) / sum(rate(pilot_xds_pushes[1m])) * 100 > 5",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: IstioPilotHighTotalRequestRate\r\n      expr: 'sum(rate(pilot_xds_push_errors[1m])) / sum(rate(pilot_xds_pushes[1m])) * 100 > 5'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio Pilot high total request rate (instance {{ $labels.instance }})\r\n        description: \"Number of Istio Pilot push errors is too high (> 5%). Envoy sidecars might have outdated configuration.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Istio Mixer Prometheus dispatches low",
                  description:
                    "Number of Mixer dispatches to Prometheus is too low. Istio metrics might not be being exported properly.",
                  query:
                    'sum(rate(mixer_runtime_dispatches_total{adapter=~"prometheus"}[1m])) < 180',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: IstioMixerPrometheusDispatchesLow\r\n      expr: \'sum(rate(mixer_runtime_dispatches_total{adapter=~"prometheus"}[1m])) < 180\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio Mixer Prometheus dispatches low (instance {{ $labels.instance }})\r\n        description: "Number of Mixer dispatches to Prometheus is too low. Istio metrics might not be being exported properly.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio high total request rate",
                  description:
                    "Global request rate in the service mesh is unusually high.",
                  query:
                    'sum(rate(istio_requests_total{reporter="destination"}[5m])) > 1000',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: IstioHighTotalRequestRate\r\n      expr: \'sum(rate(istio_requests_total{reporter="destination"}[5m])) > 1000\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio high total request rate (instance {{ $labels.instance }})\r\n        description: "Global request rate in the service mesh is unusually high.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio low total request rate",
                  description:
                    "Global request rate in the service mesh is unusually low.",
                  query:
                    'sum(rate(istio_requests_total{reporter="destination"}[5m])) < 100',
                  severity: "warning",
                  for: "2m",
                  content:
                    '- alert: IstioLowTotalRequestRate\r\n      expr: \'sum(rate(istio_requests_total{reporter="destination"}[5m])) < 100\'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio low total request rate (instance {{ $labels.instance }})\r\n        description: "Global request rate in the service mesh is unusually low.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio high 4xx error rate",
                  description:
                    "High percentage of HTTP 5xx responses in Istio (> 5%).",
                  query:
                    'sum(rate(istio_requests_total{reporter="destination", response_code=~"4.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: IstioHigh4xxErrorRate\r\n      expr: \'sum(rate(istio_requests_total{reporter="destination", response_code=~"4.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio high 4xx error rate (instance {{ $labels.instance }})\r\n        description: "High percentage of HTTP 5xx responses in Istio (> 5%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio high 5xx error rate",
                  description:
                    "High percentage of HTTP 5xx responses in Istio (> 5%).",
                  query:
                    'sum(rate(istio_requests_total{reporter="destination", response_code=~"5.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: IstioHigh5xxErrorRate\r\n      expr: \'sum(rate(istio_requests_total{reporter="destination", response_code=~"5.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio high 5xx error rate (instance {{ $labels.instance }})\r\n        description: "High percentage of HTTP 5xx responses in Istio (> 5%).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio high request latency",
                  description:
                    "Istio average requests execution is longer than 100ms.",
                  query:
                    'rate(istio_request_duration_milliseconds_sum{reporter="destination"}[1m]) / rate(istio_request_duration_milliseconds_count{reporter="destination"}[1m]) > 100',
                  severity: "warning",
                  for: "1m",
                  content:
                    '- alert: IstioHighRequestLatency\r\n      expr: \'rate(istio_request_duration_milliseconds_sum{reporter="destination"}[1m]) / rate(istio_request_duration_milliseconds_count{reporter="destination"}[1m]) > 100\'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio high request latency (instance {{ $labels.instance }})\r\n        description: "Istio average requests execution is longer than 100ms.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Istio latency 99 percentile",
                  description:
                    "Istio 1% slowest requests are longer than 1000ms.",
                  query:
                    "histogram_quantile(0.99, sum(rate(istio_request_duration_milliseconds_bucket[1m])) by (destination_canonical_service, destination_workload_namespace, source_canonical_service, source_workload_namespace, le)) > 1000",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: IstioLatency99Percentile\r\n      expr: 'histogram_quantile(0.99, sum(rate(istio_request_duration_milliseconds_bucket[1m])) by (destination_canonical_service, destination_workload_namespace, source_canonical_service, source_workload_namespace, le)) > 1000'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Istio latency 99 percentile (instance {{ $labels.instance }})\r\n        description: \"Istio 1% slowest requests are longer than 1000ms.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Istio Pilot Duplicate Entry",
                  description: "Istio pilot duplicate entry error.",
                  query: "sum(rate(pilot_duplicate_envoy_clusters{}[5m])) > 0",
                  severity: "critical",
                  content:
                    "- alert: IstioPilotDuplicateEntry\r\n      expr: 'sum(rate(pilot_duplicate_envoy_clusters{}[5m])) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Istio Pilot Duplicate Entry (instance {{ $labels.instance }})\r\n        description: \"Istio pilot duplicate entry error.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "ArgoCD",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://argo-cd.readthedocs.io/en/stable/operator-manual/metrics/",
              rules: [
                {
                  name: "ArgoCD service not synced",
                  description:
                    "Service {{ $labels.name }} run by argo is currently not in sync.",
                  query: 'argocd_app_info{sync_status!="Synced"} != 0',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ArgocdServiceNotSynced\r\n      expr: \'argocd_app_info{sync_status!="Synced"} != 0\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ArgoCD service not synced (instance {{ $labels.instance }})\r\n        description: "Service {{ $labels.name }} run by argo is currently not in sync.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "ArgoCD service unhealthy",
                  description:
                    "Service {{ $labels.name }} run by argo is currently not healthy.",
                  query: 'argocd_app_info{health_status!="Healthy"} != 0',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ArgocdServiceUnhealthy\r\n      expr: \'argocd_app_info{health_status!="Healthy"} != 0\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ArgoCD service unhealthy (instance {{ $labels.instance }})\r\n        description: "Service {{ $labels.name }} run by argo is currently not healthy.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Network, security and storage",
      services: [
        {
          name: "Ceph",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url: "https://docs.ceph.com/en/quincy/mgr/prometheus/",
              rules: [
                {
                  name: "Ceph State",
                  description: "Ceph instance unhealthy",
                  query: "ceph_health_status != 0",
                  severity: "critical",
                  content:
                    "- alert: CephState\r\n      expr: 'ceph_health_status != 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Ceph State (instance {{ $labels.instance }})\r\n        description: \"Ceph instance unhealthy\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph monitor clock skew",
                  description:
                    "Ceph monitor clock skew detected. Please check ntp and hardware clock settings",
                  query: "abs(ceph_monitor_clock_skew_seconds) > 0.2",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephMonitorClockSkew\r\n      expr: 'abs(ceph_monitor_clock_skew_seconds) > 0.2'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph monitor clock skew (instance {{ $labels.instance }})\r\n        description: \"Ceph monitor clock skew detected. Please check ntp and hardware clock settings\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph monitor low space",
                  description: "Ceph monitor storage is low.",
                  query: "ceph_monitor_avail_percent < 10",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephMonitorLowSpace\r\n      expr: 'ceph_monitor_avail_percent < 10'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph monitor low space (instance {{ $labels.instance }})\r\n        description: \"Ceph monitor storage is low.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph OSD Down",
                  description: "Ceph Object Storage Daemon Down",
                  query: "ceph_osd_up == 0",
                  severity: "critical",
                  content:
                    "- alert: CephOsdDown\r\n      expr: 'ceph_osd_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Ceph OSD Down (instance {{ $labels.instance }})\r\n        description: \"Ceph Object Storage Daemon Down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph high OSD latency",
                  description:
                    "Ceph Object Storage Daemon latency is high. Please check if it doesn't stuck in weird state.",
                  query: "ceph_osd_perf_apply_latency_seconds > 5",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: CephHighOsdLatency\r\n      expr: 'ceph_osd_perf_apply_latency_seconds > 5'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph high OSD latency (instance {{ $labels.instance }})\r\n        description: \"Ceph Object Storage Daemon latency is high. Please check if it doesn't stuck in weird state.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph OSD low space",
                  description:
                    "Ceph Object Storage Daemon is going out of space. Please add more disks.",
                  query: "ceph_osd_utilization > 90",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephOsdLowSpace\r\n      expr: 'ceph_osd_utilization > 90'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph OSD low space (instance {{ $labels.instance }})\r\n        description: \"Ceph Object Storage Daemon is going out of space. Please add more disks.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph OSD reweighted",
                  description:
                    "Ceph Object Storage Daemon takes too much time to resize.",
                  query: "ceph_osd_weight < 1",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephOsdReweighted\r\n      expr: 'ceph_osd_weight < 1'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph OSD reweighted (instance {{ $labels.instance }})\r\n        description: \"Ceph Object Storage Daemon takes too much time to resize.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG down",
                  description:
                    "Some Ceph placement groups are down. Please ensure that all the data are available.",
                  query: "ceph_pg_down > 0",
                  severity: "critical",
                  content:
                    "- alert: CephPgDown\r\n      expr: 'ceph_pg_down > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Ceph PG down (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are down. Please ensure that all the data are available.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG incomplete",
                  description:
                    "Some Ceph placement groups are incomplete. Please ensure that all the data are available.",
                  query: "ceph_pg_incomplete > 0",
                  severity: "critical",
                  content:
                    "- alert: CephPgIncomplete\r\n      expr: 'ceph_pg_incomplete > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Ceph PG incomplete (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are incomplete. Please ensure that all the data are available.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG inconsistent",
                  description:
                    "Some Ceph placement groups are inconsistent. Data is available but inconsistent across nodes.",
                  query: "ceph_pg_inconsistent > 0",
                  severity: "warning",
                  content:
                    "- alert: CephPgInconsistent\r\n      expr: 'ceph_pg_inconsistent > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph PG inconsistent (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are inconsistent. Data is available but inconsistent across nodes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG activation long",
                  description:
                    "Some Ceph placement groups are too long to activate.",
                  query: "ceph_pg_activating > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephPgActivationLong\r\n      expr: 'ceph_pg_activating > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph PG activation long (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are too long to activate.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG backfill full",
                  description:
                    "Some Ceph placement groups are located on full Object Storage Daemon on cluster. Those PGs can be unavailable shortly. Please check OSDs, change weight or reconfigure CRUSH rules.",
                  query: "ceph_pg_backfill_toofull > 0",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: CephPgBackfillFull\r\n      expr: 'ceph_pg_backfill_toofull > 0'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Ceph PG backfill full (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are located on full Object Storage Daemon on cluster. Those PGs can be unavailable shortly. Please check OSDs, change weight or reconfigure CRUSH rules.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Ceph PG unavailable",
                  description: "Some Ceph placement groups are unavailable.",
                  query: "ceph_pg_total - ceph_pg_active > 0",
                  severity: "critical",
                  content:
                    "- alert: CephPgUnavailable\r\n      expr: 'ceph_pg_total - ceph_pg_active > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Ceph PG unavailable (instance {{ $labels.instance }})\r\n        description: \"Some Ceph placement groups are unavailable.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "SpeedTest",
          exporters: [
            {
              name: "Speedtest exporter",
              slug: "nlamirault-speedtest-exporter",
              doc_url: "https://github.com/nlamirault/speedtest_exporter",
              rules: [
                {
                  name: "SpeedTest Slow Internet Download",
                  description:
                    "Internet download speed is currently {{humanize $value}} Mbps.",
                  query: "avg_over_time(speedtest_download[10m]) < 100",
                  severity: "warning",
                  content:
                    "- alert: SpeedtestSlowInternetDownload\r\n      expr: 'avg_over_time(speedtest_download[10m]) < 100'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: SpeedTest Slow Internet Download (instance {{ $labels.instance }})\r\n        description: \"Internet download speed is currently {{humanize $value}} Mbps.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "SpeedTest Slow Internet Upload",
                  description:
                    "Internet upload speed is currently {{humanize $value}} Mbps.",
                  query: "avg_over_time(speedtest_upload[10m]) < 20",
                  severity: "warning",
                  content:
                    "- alert: SpeedtestSlowInternetUpload\r\n      expr: 'avg_over_time(speedtest_upload[10m]) < 20'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: SpeedTest Slow Internet Upload (instance {{ $labels.instance }})\r\n        description: \"Internet upload speed is currently {{humanize $value}} Mbps.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "ZFS",
          exporters: [
            {
              name: "node-exporter",
              slug: "node-exporter",
              doc_url: "https://github.com/prometheus/node_exporter",
              rules: [
                {
                  name: "ZFS offline pool",
                  description:
                    "A ZFS zpool is in a unexpected state: {{ $labels.state }}.",
                  query: 'node_zfs_zpool_state{state!="online"} > 0',
                  severity: "critical",
                  for: "1m",
                  content:
                    '- alert: ZfsOfflinePool\r\n      expr: \'node_zfs_zpool_state{state!="online"} > 0\'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ZFS offline pool (instance {{ $labels.instance }})\r\n        description: "A ZFS zpool is in a unexpected state: {{ $labels.state }}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "ZFS exporter",
              slug: "zfs_exporter",
              doc_url: "https://github.com/pdf/zfs_exporter",
              rules: [
                {
                  name: "ZFS pool out of space",
                  description: "Disk is almost full (< 10% left)",
                  query:
                    "zfs_pool_free_bytes * 100 / zfs_pool_size_bytes < 10 and ON (instance, device, mountpoint) zfs_pool_readonly == 0",
                  severity: "warning",
                  content:
                    "- alert: ZfsPoolOutOfSpace\r\n      expr: 'zfs_pool_free_bytes * 100 / zfs_pool_size_bytes < 10 and ON (instance, device, mountpoint) zfs_pool_readonly == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ZFS pool out of space (instance {{ $labels.instance }})\r\n        description: \"Disk is almost full (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ZFS pool unhealthy",
                  description:
                    "ZFS pool state is {{ $value }}. See comments for more information.",
                  query: "zfs_pool_health > 0",
                  severity: "critical",
                  comments:
                    "0: ONLINE\n1: DEGRADED\n2: FAULTED\n3: OFFLINE\n4: UNAVAIL\n5: REMOVED\n6: SUSPENDED\n",
                  content:
                    "# 0: ONLINE\n1: DEGRADED\n2: FAULTED\n3: OFFLINE\n4: UNAVAIL\n5: REMOVED\n6: SUSPENDED\r\n    - alert: ZfsPoolUnhealthy\r\n      expr: 'zfs_pool_health > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: ZFS pool unhealthy (instance {{ $labels.instance }})\r\n        description: \"ZFS pool state is {{ $value }}. See comments for more information.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "ZFS collector failed",
                  description:
                    "ZFS collector for {{ $labels.instance }} has failed to collect information",
                  query: "zfs_scrape_collector_success != 1",
                  severity: "warning",
                  content:
                    "- alert: ZfsCollectorFailed\r\n      expr: 'zfs_scrape_collector_success != 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: ZFS collector failed (instance {{ $labels.instance }})\r\n        description: \"ZFS collector for {{ $labels.instance }} has failed to collect information\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "OpenEBS",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "OpenEBS used pool capacity",
                  description: "OpenEBS Pool use more than 80% of his capacity",
                  query: "openebs_used_pool_capacity_percent > 80",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: OpenebsUsedPoolCapacity\r\n      expr: 'openebs_used_pool_capacity_percent > 80'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: OpenEBS used pool capacity (instance {{ $labels.instance }})\r\n        description: \"OpenEBS Pool use more than 80% of his capacity\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Minio",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Minio cluster disk offline",
                  description: "Minio cluster disk is offline",
                  query: "minio_cluster_drive_offline_total > 0",
                  severity: "critical",
                  content:
                    "- alert: MinioClusterDiskOffline\r\n      expr: 'minio_cluster_drive_offline_total > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Minio cluster disk offline (instance {{ $labels.instance }})\r\n        description: \"Minio cluster disk is offline\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Minio node disk offline",
                  description: "Minio cluster node disk is offline",
                  query: "minio_cluster_nodes_offline_total > 0",
                  severity: "critical",
                  content:
                    "- alert: MinioNodeDiskOffline\r\n      expr: 'minio_cluster_nodes_offline_total > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Minio node disk offline (instance {{ $labels.instance }})\r\n        description: \"Minio cluster node disk is offline\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Minio disk space usage",
                  description: "Minio available free space is low (< 10%)",
                  query:
                    "disk_storage_available / disk_storage_total * 100 < 10",
                  severity: "warning",
                  content:
                    "- alert: MinioDiskSpaceUsage\r\n      expr: 'disk_storage_available / disk_storage_total * 100 < 10'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Minio disk space usage (instance {{ $labels.instance }})\r\n        description: \"Minio available free space is low (< 10%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "SSL/TLS",
          exporters: [
            {
              name: "ssl_exporter",
              slug: "ribbybibby-ssl-exporter",
              doc_url: "https://github.com/ribbybibby/ssl_exporter",
              rules: [
                {
                  name: "SSL certificate probe failed",
                  description:
                    "Failed to fetch SSL information {{ $labels.instance }}",
                  query: "ssl_probe_success == 0",
                  severity: "critical",
                  content:
                    "- alert: SslCertificateProbeFailed\r\n      expr: 'ssl_probe_success == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: SSL certificate probe failed (instance {{ $labels.instance }})\r\n        description: \"Failed to fetch SSL information {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "SSL certificate OSCP status unknown",
                  description:
                    "Failed to get the OSCP status {{ $labels.instance }}",
                  query: "ssl_ocsp_response_status == 2",
                  severity: "warning",
                  content:
                    "- alert: SslCertificateOscpStatusUnknown\r\n      expr: 'ssl_ocsp_response_status == 2'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: SSL certificate OSCP status unknown (instance {{ $labels.instance }})\r\n        description: \"Failed to get the OSCP status {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "SSL certificate revoked",
                  description: "SSL certificate revoked {{ $labels.instance }}",
                  query: "ssl_ocsp_response_status == 1",
                  severity: "critical",
                  content:
                    "- alert: SslCertificateRevoked\r\n      expr: 'ssl_ocsp_response_status == 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: SSL certificate revoked (instance {{ $labels.instance }})\r\n        description: \"SSL certificate revoked {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "SSL certificate expiry (< 7 days)",
                  description:
                    "{{ $labels.instance }} Certificate is expiring in 7 days",
                  query:
                    'ssl_verified_cert_not_after{chain_no="0"} - time() < 86400 * 7',
                  severity: "warning",
                  content:
                    '- alert: SslCertificateExpiry(<7Days)\r\n      expr: \'ssl_verified_cert_not_after{chain_no="0"} - time() < 86400 * 7\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: SSL certificate expiry (< 7 days) (instance {{ $labels.instance }})\r\n        description: "{{ $labels.instance }} Certificate is expiring in 7 days\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Juniper",
          exporters: [
            {
              name: "czerwonk/junos_exporter",
              slug: "czerwonk-junos-exporter",
              doc_url: "https://github.com/czerwonk/junos_exporter",
              rules: [
                {
                  name: "Juniper switch down",
                  description: "The switch appears to be down",
                  query: "junos_up == 0",
                  severity: "critical",
                  content:
                    "- alert: JuniperSwitchDown\r\n      expr: 'junos_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Juniper switch down (instance {{ $labels.instance }})\r\n        description: \"The switch appears to be down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Juniper high Bandwidth Usage 1GiB",
                  description: "Interface is highly saturated. (> 0.90GiB/s)",
                  query:
                    "rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.90",
                  severity: "critical",
                  for: "1m",
                  content:
                    "- alert: JuniperHighBandwidthUsage1gib\r\n      expr: 'rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.90'\r\n      for: 1m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Juniper high Bandwidth Usage 1GiB (instance {{ $labels.instance }})\r\n        description: \"Interface is highly saturated. (> 0.90GiB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Juniper high Bandwidth Usage 1GiB",
                  description: "Interface is getting saturated. (> 0.80GiB/s)",
                  query:
                    "rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.80",
                  severity: "warning",
                  for: "1m",
                  content:
                    "- alert: JuniperHighBandwidthUsage1gib\r\n      expr: 'rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.80'\r\n      for: 1m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Juniper high Bandwidth Usage 1GiB (instance {{ $labels.instance }})\r\n        description: \"Interface is getting saturated. (> 0.80GiB/s)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "CoreDNS",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "CoreDNS Panic Count",
                  description: "Number of CoreDNS panics encountered",
                  query: "increase(coredns_panics_total[1m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: CorednsPanicCount\r\n      expr: 'increase(coredns_panics_total[1m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: CoreDNS Panic Count (instance {{ $labels.instance }})\r\n        description: \"Number of CoreDNS panics encountered\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Freeswitch",
          exporters: [
            {
              name: "znerol/prometheus-freeswitch-exporter",
              slug: "znerol-freeswitch-exporter",
              doc_url:
                "https://pypi.org/project/prometheus-freeswitch-exporter",
              rules: [
                {
                  name: "Freeswitch down",
                  description: "Freeswitch is unresponsive",
                  query: "freeswitch_up == 0",
                  severity: "critical",
                  content:
                    "- alert: FreeswitchDown\r\n      expr: 'freeswitch_up == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Freeswitch down (instance {{ $labels.instance }})\r\n        description: \"Freeswitch is unresponsive\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Freeswitch Sessions Warning",
                  description:
                    'High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query:
                    "(freeswitch_session_active * 100 / freeswitch_session_limit) > 80",
                  severity: "warning",
                  for: "10m",
                  content:
                    '- alert: FreeswitchSessionsWarning\r\n      expr: \'(freeswitch_session_active * 100 / freeswitch_session_limit) > 80\'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Freeswitch Sessions Warning (instance {{ $labels.instance }})\r\n        description: "High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Freeswitch Sessions Critical",
                  description:
                    'High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query:
                    "(freeswitch_session_active * 100 / freeswitch_session_limit) > 90",
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: FreeswitchSessionsCritical\r\n      expr: \'(freeswitch_session_active * 100 / freeswitch_session_limit) > 90\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Freeswitch Sessions Critical (instance {{ $labels.instance }})\r\n        description: "High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Hashicorp Vault",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              doc_url:
                "https://github.com/hashicorp/vault/blob/master/website/content/docs/configuration/telemetry.mdx#prometheus",
              rules: [
                {
                  name: "Vault sealed",
                  description:
                    "Vault instance is sealed on {{ $labels.instance }}",
                  query: "vault_core_unsealed == 0",
                  severity: "critical",
                  content:
                    "- alert: VaultSealed\r\n      expr: 'vault_core_unsealed == 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Vault sealed (instance {{ $labels.instance }})\r\n        description: \"Vault instance is sealed on {{ $labels.instance }}\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Vault too many pending tokens",
                  description:
                    'Too many pending tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query:
                    "avg(vault_token_create_count - vault_token_store_count) > 0",
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: VaultTooManyPendingTokens\r\n      expr: \'avg(vault_token_create_count - vault_token_store_count) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Vault too many pending tokens (instance {{ $labels.instance }})\r\n        description: "Too many pending tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Vault too many infinity tokens",
                  description:
                    'Too many infinity tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query: 'vault_token_count_by_ttl{creation_ttl="+Inf"} > 3',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: VaultTooManyInfinityTokens\r\n      expr: \'vault_token_count_by_ttl{creation_ttl="+Inf"} > 3\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Vault too many infinity tokens (instance {{ $labels.instance }})\r\n        description: "Too many infinity tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Vault cluster health",
                  description:
                    'Vault cluster is not healthy {{ $labels.instance }}: {{ $value | printf "%.2f"}}%',
                  query:
                    "sum(vault_core_active) / count(vault_core_active) <= 0.5",
                  severity: "critical",
                  content:
                    '- alert: VaultClusterHealth\r\n      expr: \'sum(vault_core_active) / count(vault_core_active) <= 0.5\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Vault cluster health (instance {{ $labels.instance }})\r\n        description: "Vault cluster is not healthy {{ $labels.instance }}: {{ $value | printf "%.2f"}}%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Cloudflare",
          exporters: [
            {
              name: "lablabs/cloudflare-exporter",
              slug: "lablabs-cloudflare-exporter",
              doc_url: "https://github.com/lablabs/cloudflare-exporter",
              rules: [
                {
                  name: "Cloudflare http 4xx error rate",
                  description:
                    "Cloudflare high HTTP 4xx error rate (> 5% for domain {{ $labels.zone }})",
                  query:
                    '(sum by(zone) (rate(cloudflare_zone_requests_status{status=~"^4.."}[15m])) / on (zone) sum by (zone) (rate(cloudflare_zone_requests_status[15m]))) * 100 > 5',
                  severity: "warning",
                  content:
                    '- alert: CloudflareHttp4xxErrorRate\r\n      expr: \'(sum by(zone) (rate(cloudflare_zone_requests_status{status=~"^4.."}[15m])) / on (zone) sum by (zone) (rate(cloudflare_zone_requests_status[15m]))) * 100 > 5\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cloudflare http 4xx error rate (instance {{ $labels.instance }})\r\n        description: "Cloudflare high HTTP 4xx error rate (> 5% for domain {{ $labels.zone }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cloudflare http 5xx error rate",
                  description:
                    "Cloudflare high HTTP 5xx error rate (> 5% for domain {{ $labels.zone }})",
                  query:
                    '(sum by (zone) (rate(cloudflare_zone_requests_status{status=~"^5.."}[5m])) / on (zone) sum by (zone) (rate(cloudflare_zone_requests_status[5m]))) * 100 > 5',
                  severity: "critical",
                  content:
                    '- alert: CloudflareHttp5xxErrorRate\r\n      expr: \'(sum by (zone) (rate(cloudflare_zone_requests_status{status=~"^5.."}[5m])) / on (zone) sum by (zone) (rate(cloudflare_zone_requests_status[5m]))) * 100 > 5\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cloudflare http 5xx error rate (instance {{ $labels.instance }})\r\n        description: "Cloudflare high HTTP 5xx error rate (> 5% for domain {{ $labels.zone }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Other",
      services: [
        {
          name: "Thanos",
          exporters: [
            {
              name: "Thanos Compactor",
              slug: "thanos-compactor",
              rules: [
                {
                  name: "Thanos Compactor Multiple Running",
                  description:
                    "No more than one Thanos Compact instance should be running at once. There are {{$value}} instances running.",
                  query: 'sum by (job) (up{job=~".*thanos-compact.*"}) > 1',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosCompactorMultipleRunning\r\n      expr: \'sum by (job) (up{job=~".*thanos-compact.*"}) > 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Compactor Multiple Running (instance {{ $labels.instance }})\r\n        description: "No more than one Thanos Compact instance should be running at once. There are {{$value}} instances running.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Compactor Halted",
                  description:
                    "Thanos Compact {{$labels.job}} has failed to run and now is halted.",
                  query:
                    'thanos_compact_halted{job=~".*thanos-compact.*"} == 1',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosCompactorHalted\r\n      expr: \'thanos_compact_halted{job=~".*thanos-compact.*"} == 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Compactor Halted (instance {{ $labels.instance }})\r\n        description: "Thanos Compact {{$labels.job}} has failed to run and now is halted.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Compactor High Compaction Failures",
                  description:
                    "Thanos Compact {{$labels.job}} is failing to execute {{$value | humanize}}% of compactions.",
                  query:
                    '(sum by (job) (rate(thanos_compact_group_compactions_failures_total{job=~".*thanos-compact.*"}[5m])) / sum by (job) (rate(thanos_compact_group_compactions_total{job=~".*thanos-compact.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosCompactorHighCompactionFailures\r\n      expr: \'(sum by (job) (rate(thanos_compact_group_compactions_failures_total{job=~".*thanos-compact.*"}[5m])) / sum by (job) (rate(thanos_compact_group_compactions_total{job=~".*thanos-compact.*"}[5m])) * 100 > 5)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Compactor High Compaction Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Compact {{$labels.job}} is failing to execute {{$value | humanize}}% of compactions.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Compact Bucket High Operation Failures",
                  description:
                    "Thanos Compact {{$labels.job}} Bucket is failing to execute {{$value | humanize}}% of operations.",
                  query:
                    '(sum by (job) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-compact.*"}[5m])) / sum by (job) (rate(thanos_objstore_bucket_operations_total{job=~".*thanos-compact.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosCompactBucketHighOperationFailures\r\n      expr: \'(sum by (job) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-compact.*"}[5m])) / sum by (job) (rate(thanos_objstore_bucket_operations_total{job=~".*thanos-compact.*"}[5m])) * 100 > 5)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Compact Bucket High Operation Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Compact {{$labels.job}} Bucket is failing to execute {{$value | humanize}}% of operations.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Compact Has Not Run",
                  description:
                    "Thanos Compact {{$labels.job}} has not uploaded anything for 24 hours.",
                  query:
                    '(time() - max by (job) (max_over_time(thanos_objstore_bucket_last_successful_upload_time{job=~".*thanos-compact.*"}[24h]))) / 60 / 60 > 24',
                  severity: "warning",
                  for: "0m",
                  content:
                    '- alert: ThanosCompactHasNotRun\r\n      expr: \'(time() - max by (job) (max_over_time(thanos_objstore_bucket_last_successful_upload_time{job=~".*thanos-compact.*"}[24h]))) / 60 / 60 > 24\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Compact Has Not Run (instance {{ $labels.instance }})\r\n        description: "Thanos Compact {{$labels.job}} has not uploaded anything for 24 hours.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Query",
              slug: "thanos-query",
              rules: [
                {
                  name: "Thanos Query Http Request Query Error Rate High",
                  description:
                    'Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of "query" requests.',
                  query:
                    '(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-query.*", handler="query"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-query.*", handler="query"}[5m]))) * 100 > 5',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosQueryHttpRequestQueryErrorRateHigh\r\n      expr: \'(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-query.*", handler="query"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-query.*", handler="query"}[5m]))) * 100 > 5\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Query Http Request Query Error Rate High (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of "query" requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Http Request Query Range Error Rate High",
                  description:
                    'Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of "query_range" requests.',
                  query:
                    '(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-query.*", handler="query_range"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-query.*", handler="query_range"}[5m]))) * 100 > 5',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosQueryHttpRequestQueryRangeErrorRateHigh\r\n      expr: \'(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-query.*", handler="query_range"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-query.*", handler="query_range"}[5m]))) * 100 > 5\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Query Http Request Query Range Error Rate High (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of "query_range" requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Grpc Server Error Rate",
                  description:
                    "Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-query.*"}[5m]))/  sum by (job) (rate(grpc_server_started_total{job=~".*thanos-query.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosQueryGrpcServerErrorRate\r\n      expr: \'(sum by (job) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-query.*"}[5m]))/  sum by (job) (rate(grpc_server_started_total{job=~".*thanos-query.*"}[5m])) * 100 > 5)\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Query Grpc Server Error Rate (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Grpc Client Error Rate",
                  description:
                    "Thanos Query {{$labels.job}} is failing to send {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job) (rate(grpc_client_handled_total{grpc_code!="OK", job=~".*thanos-query.*"}[5m])) / sum by (job) (rate(grpc_client_started_total{job=~".*thanos-query.*"}[5m]))) * 100 > 5',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosQueryGrpcClientErrorRate\r\n      expr: \'(sum by (job) (rate(grpc_client_handled_total{grpc_code!="OK", job=~".*thanos-query.*"}[5m])) / sum by (job) (rate(grpc_client_started_total{job=~".*thanos-query.*"}[5m]))) * 100 > 5\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Query Grpc Client Error Rate (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} is failing to send {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query High D N S Failures",
                  description:
                    "Thanos Query {{$labels.job}} have {{$value | humanize}}% of failing DNS queries for store endpoints.",
                  query:
                    '(sum by (job) (rate(thanos_query_store_apis_dns_failures_total{job=~".*thanos-query.*"}[5m])) / sum by (job) (rate(thanos_query_store_apis_dns_lookups_total{job=~".*thanos-query.*"}[5m]))) * 100 > 1',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosQueryHighDNSFailures\r\n      expr: \'(sum by (job) (rate(thanos_query_store_apis_dns_failures_total{job=~".*thanos-query.*"}[5m])) / sum by (job) (rate(thanos_query_store_apis_dns_lookups_total{job=~".*thanos-query.*"}[5m]))) * 100 > 1\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Query High D N S Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} have {{$value | humanize}}% of failing DNS queries for store endpoints.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Instant Latency High",
                  description:
                    "Thanos Query {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for instant queries.",
                  query:
                    '(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query"}[5m]))) > 40 and sum by (job) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query"}[5m])) > 0)',
                  severity: "critical",
                  for: "10m",
                  content:
                    '- alert: ThanosQueryInstantLatencyHigh\r\n      expr: \'(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query"}[5m]))) > 40 and sum by (job) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query"}[5m])) > 0)\'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Query Instant Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for instant queries.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Range Latency High",
                  description:
                    "Thanos Query {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for range queries.",
                  query:
                    '(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query_range"}[5m]))) > 90 and sum by (job) (rate(http_request_duration_seconds_count{job=~".*thanos-query.*", handler="query_range"}[5m])) > 0)',
                  severity: "critical",
                  for: "10m",
                  content:
                    '- alert: ThanosQueryRangeLatencyHigh\r\n      expr: \'(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-query.*", handler="query_range"}[5m]))) > 90 and sum by (job) (rate(http_request_duration_seconds_count{job=~".*thanos-query.*", handler="query_range"}[5m])) > 0)\'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Query Range Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Query {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for range queries.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Overload",
                  description:
                    "Thanos Query {{$labels.job}} has been overloaded for more than 15 minutes. This may be a symptom of excessive simultanous complex requests, low performance of the Prometheus API, or failures within these components. Assess the health of the Thanos query instances, the connnected Prometheus instances, look for potential senders of these requests and then contact support.",
                  query:
                    "(max_over_time(thanos_query_concurrent_gate_queries_max[5m]) - avg_over_time(thanos_query_concurrent_gate_queries_in_flight[5m]) < 1)",
                  severity: "warning",
                  for: "15m",
                  content:
                    "- alert: ThanosQueryOverload\r\n      expr: '(max_over_time(thanos_query_concurrent_gate_queries_max[5m]) - avg_over_time(thanos_query_concurrent_gate_queries_in_flight[5m]) < 1)'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Query Overload (instance {{ $labels.instance }})\r\n        description: \"Thanos Query {{$labels.job}} has been overloaded for more than 15 minutes. This may be a symptom of excessive simultanous complex requests, low performance of the Prometheus API, or failures within these components. Assess the health of the Thanos query instances, the connnected Prometheus instances, look for potential senders of these requests and then contact support.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
            {
              name: "Thanos Receiver",
              slug: "thanos-receiver",
              rules: [
                {
                  name: "Thanos Receive Http Request Error Rate High",
                  description:
                    "Thanos Receive {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-receive.*", handler="receive"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-receive.*", handler="receive"}[5m]))) * 100 > 5',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosReceiveHttpRequestErrorRateHigh\r\n      expr: \'(sum by (job) (rate(http_requests_total{code=~"5..", job=~".*thanos-receive.*", handler="receive"}[5m]))/  sum by (job) (rate(http_requests_total{job=~".*thanos-receive.*", handler="receive"}[5m]))) * 100 > 5\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Receive Http Request Error Rate High (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive Http Request Latency High",
                  description:
                    "Thanos Receive {{$labels.job}} has a 99th percentile latency of {{ $value }} seconds for requests.",
                  query:
                    '(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-receive.*", handler="receive"}[5m]))) > 10 and sum by (job) (rate(http_request_duration_seconds_count{job=~".*thanos-receive.*", handler="receive"}[5m])) > 0)',
                  severity: "critical",
                  for: "10m",
                  content:
                    '- alert: ThanosReceiveHttpRequestLatencyHigh\r\n      expr: \'(histogram_quantile(0.99, sum by (job, le) (rate(http_request_duration_seconds_bucket{job=~".*thanos-receive.*", handler="receive"}[5m]))) > 10 and sum by (job) (rate(http_request_duration_seconds_count{job=~".*thanos-receive.*", handler="receive"}[5m])) > 0)\'\r\n      for: 10m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Receive Http Request Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} has a 99th percentile latency of {{ $value }} seconds for requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive High Replication Failures",
                  description:
                    "Thanos Receive {{$labels.job}} is failing to replicate {{$value | humanize}}% of requests.",
                  query:
                    'thanos_receive_replication_factor > 1 and ((sum by (job) (rate(thanos_receive_replications_total{result="error", job=~".*thanos-receive.*"}[5m])) / sum by (job) (rate(thanos_receive_replications_total{job=~".*thanos-receive.*"}[5m]))) > (max by (job) (floor((thanos_receive_replication_factor{job=~".*thanos-receive.*"}+1)/ 2)) / max by (job) (thanos_receive_hashring_nodes{job=~".*thanos-receive.*"}))) * 100',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosReceiveHighReplicationFailures\r\n      expr: \'thanos_receive_replication_factor > 1 and ((sum by (job) (rate(thanos_receive_replications_total{result="error", job=~".*thanos-receive.*"}[5m])) / sum by (job) (rate(thanos_receive_replications_total{job=~".*thanos-receive.*"}[5m]))) > (max by (job) (floor((thanos_receive_replication_factor{job=~".*thanos-receive.*"}+1)/ 2)) / max by (job) (thanos_receive_hashring_nodes{job=~".*thanos-receive.*"}))) * 100\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Receive High Replication Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} is failing to replicate {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive High Forward Request Failures",
                  description:
                    "Thanos Receive {{$labels.job}} is failing to forward {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job) (rate(thanos_receive_forward_requests_total{result="error", job=~".*thanos-receive.*"}[5m]))/  sum by (job) (rate(thanos_receive_forward_requests_total{job=~".*thanos-receive.*"}[5m]))) * 100 > 20',
                  severity: "info",
                  for: "5m",
                  content:
                    '- alert: ThanosReceiveHighForwardRequestFailures\r\n      expr: \'(sum by (job) (rate(thanos_receive_forward_requests_total{result="error", job=~".*thanos-receive.*"}[5m]))/  sum by (job) (rate(thanos_receive_forward_requests_total{job=~".*thanos-receive.*"}[5m]))) * 100 > 20\'\r\n      for: 5m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Thanos Receive High Forward Request Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} is failing to forward {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive High Hashring File Refresh Failures",
                  description:
                    "Thanos Receive {{$labels.job}} is failing to refresh hashring file, {{$value | humanize}} of attempts failed.",
                  query:
                    '(sum by (job) (rate(thanos_receive_hashrings_file_errors_total{job=~".*thanos-receive.*"}[5m])) / sum by (job) (rate(thanos_receive_hashrings_file_refreshes_total{job=~".*thanos-receive.*"}[5m])) > 0)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosReceiveHighHashringFileRefreshFailures\r\n      expr: \'(sum by (job) (rate(thanos_receive_hashrings_file_errors_total{job=~".*thanos-receive.*"}[5m])) / sum by (job) (rate(thanos_receive_hashrings_file_refreshes_total{job=~".*thanos-receive.*"}[5m])) > 0)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Receive High Hashring File Refresh Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} is failing to refresh hashring file, {{$value | humanize}} of attempts failed.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive Config Reload Failure",
                  description:
                    "Thanos Receive {{$labels.job}} has not been able to reload hashring configurations.",
                  query:
                    'avg by (job) (thanos_receive_config_last_reload_successful{job=~".*thanos-receive.*"}) != 1',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosReceiveConfigReloadFailure\r\n      expr: \'avg by (job) (thanos_receive_config_last_reload_successful{job=~".*thanos-receive.*"}) != 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Receive Config Reload Failure (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.job}} has not been able to reload hashring configurations.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive No Upload",
                  description:
                    "Thanos Receive {{$labels.instance}} has not uploaded latest data to object storage.",
                  query:
                    '(up{job=~".*thanos-receive.*"} - 1) + on (job, instance) (sum by (job, instance) (increase(thanos_shipper_uploads_total{job=~".*thanos-receive.*"}[3h])) == 0)',
                  severity: "critical",
                  for: "3h",
                  content:
                    '- alert: ThanosReceiveNoUpload\r\n      expr: \'(up{job=~".*thanos-receive.*"} - 1) + on (job, instance) (sum by (job, instance) (increase(thanos_shipper_uploads_total{job=~".*thanos-receive.*"}[3h])) == 0)\'\r\n      for: 3h\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Receive No Upload (instance {{ $labels.instance }})\r\n        description: "Thanos Receive {{$labels.instance}} has not uploaded latest data to object storage.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Sidecar",
              slug: "thanos-sidecar",
              rules: [
                {
                  name: "Thanos Sidecar Bucket Operations Failed",
                  description:
                    "Thanos Sidecar {{$labels.instance}} bucket operations are failing",
                  query:
                    'sum by (job, instance) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-sidecar.*"}[5m])) > 0',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosSidecarBucketOperationsFailed\r\n      expr: \'sum by (job, instance) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-sidecar.*"}[5m])) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Sidecar Bucket Operations Failed (instance {{ $labels.instance }})\r\n        description: "Thanos Sidecar {{$labels.instance}} bucket operations are failing\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Sidecar No Connection To Started Prometheus",
                  description:
                    "Thanos Sidecar {{$labels.instance}} is unhealthy.",
                  query:
                    'thanos_sidecar_prometheus_up{job=~".*thanos-sidecar.*"} == 0 and on (namespace, pod)prometheus_tsdb_data_replay_duration_seconds != 0',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosSidecarNoConnectionToStartedPrometheus\r\n      expr: \'thanos_sidecar_prometheus_up{job=~".*thanos-sidecar.*"} == 0 and on (namespace, pod)prometheus_tsdb_data_replay_duration_seconds != 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Sidecar No Connection To Started Prometheus (instance {{ $labels.instance }})\r\n        description: "Thanos Sidecar {{$labels.instance}} is unhealthy.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Store",
              slug: "thanos-store",
              rules: [
                {
                  name: "Thanos Store Grpc Error Rate",
                  description:
                    "Thanos Store {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-store.*"}[5m]))/  sum by (job) (rate(grpc_server_started_total{job=~".*thanos-store.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosStoreGrpcErrorRate\r\n      expr: \'(sum by (job) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-store.*"}[5m]))/  sum by (job) (rate(grpc_server_started_total{job=~".*thanos-store.*"}[5m])) * 100 > 5)\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Store Grpc Error Rate (instance {{ $labels.instance }})\r\n        description: "Thanos Store {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Store Series Gate Latency High",
                  description:
                    "Thanos Store {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for store series gate requests.",
                  query:
                    '(histogram_quantile(0.99, sum by (job, le) (rate(thanos_bucket_store_series_gate_duration_seconds_bucket{job=~".*thanos-store.*"}[5m]))) > 2 and sum by (job) (rate(thanos_bucket_store_series_gate_duration_seconds_count{job=~".*thanos-store.*"}[5m])) > 0)',
                  severity: "warning",
                  for: "10m",
                  content:
                    '- alert: ThanosStoreSeriesGateLatencyHigh\r\n      expr: \'(histogram_quantile(0.99, sum by (job, le) (rate(thanos_bucket_store_series_gate_duration_seconds_bucket{job=~".*thanos-store.*"}[5m]))) > 2 and sum by (job) (rate(thanos_bucket_store_series_gate_duration_seconds_count{job=~".*thanos-store.*"}[5m])) > 0)\'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Store Series Gate Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Store {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for store series gate requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Store Bucket High Operation Failures",
                  description:
                    "Thanos Store {{$labels.job}} Bucket is failing to execute {{$value | humanize}}% of operations.",
                  query:
                    '(sum by (job) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-store.*"}[5m])) / sum by (job) (rate(thanos_objstore_bucket_operations_total{job=~".*thanos-store.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosStoreBucketHighOperationFailures\r\n      expr: \'(sum by (job) (rate(thanos_objstore_bucket_operation_failures_total{job=~".*thanos-store.*"}[5m])) / sum by (job) (rate(thanos_objstore_bucket_operations_total{job=~".*thanos-store.*"}[5m])) * 100 > 5)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Store Bucket High Operation Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Store {{$labels.job}} Bucket is failing to execute {{$value | humanize}}% of operations.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Store Objstore Operation Latency High",
                  description:
                    "Thanos Store {{$labels.job}} Bucket has a 99th percentile latency of {{$value}} seconds for the bucket operations.",
                  query:
                    '(histogram_quantile(0.99, sum by (job, le) (rate(thanos_objstore_bucket_operation_duration_seconds_bucket{job=~".*thanos-store.*"}[5m]))) > 2 and  sum by (job) (rate(thanos_objstore_bucket_operation_duration_seconds_count{job=~".*thanos-store.*"}[5m])) > 0)',
                  severity: "warning",
                  for: "10m",
                  content:
                    '- alert: ThanosStoreObjstoreOperationLatencyHigh\r\n      expr: \'(histogram_quantile(0.99, sum by (job, le) (rate(thanos_objstore_bucket_operation_duration_seconds_bucket{job=~".*thanos-store.*"}[5m]))) > 2 and  sum by (job) (rate(thanos_objstore_bucket_operation_duration_seconds_count{job=~".*thanos-store.*"}[5m])) > 0)\'\r\n      for: 10m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Store Objstore Operation Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Store {{$labels.job}} Bucket has a 99th percentile latency of {{$value}} seconds for the bucket operations.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Ruler",
              slug: "thanos-ruler",
              rules: [
                {
                  name: "Thanos Rule Queue Is Dropping Alerts",
                  description:
                    "Thanos Rule {{$labels.instance}} is failing to queue alerts.",
                  query:
                    'sum by (job, instance) (rate(thanos_alert_queue_alerts_dropped_total{job=~".*thanos-rule.*"}[5m])) > 0',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleQueueIsDroppingAlerts\r\n      expr: \'sum by (job, instance) (rate(thanos_alert_queue_alerts_dropped_total{job=~".*thanos-rule.*"}[5m])) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Rule Queue Is Dropping Alerts (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} is failing to queue alerts.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Sender Is Failing Alerts",
                  description:
                    "Thanos Rule {{$labels.instance}} is failing to send alerts to alertmanager.",
                  query:
                    'sum by (job, instance) (rate(thanos_alert_sender_alerts_dropped_total{job=~".*thanos-rule.*"}[5m])) > 0',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleSenderIsFailingAlerts\r\n      expr: \'sum by (job, instance) (rate(thanos_alert_sender_alerts_dropped_total{job=~".*thanos-rule.*"}[5m])) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Rule Sender Is Failing Alerts (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} is failing to send alerts to alertmanager.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule High Rule Evaluation Failures",
                  description:
                    "Thanos Rule {{$labels.instance}} is failing to evaluate rules.",
                  query:
                    '(sum by (job, instance) (rate(prometheus_rule_evaluation_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(prometheus_rule_evaluations_total{job=~".*thanos-rule.*"}[5m])) * 100 > 5)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleHighRuleEvaluationFailures\r\n      expr: \'(sum by (job, instance) (rate(prometheus_rule_evaluation_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(prometheus_rule_evaluations_total{job=~".*thanos-rule.*"}[5m])) * 100 > 5)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Rule High Rule Evaluation Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} is failing to evaluate rules.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule High Rule Evaluation Warnings",
                  description:
                    "Thanos Rule {{$labels.instance}} has high number of evaluation warnings.",
                  query:
                    'sum by (job, instance) (rate(thanos_rule_evaluation_with_warnings_total{job=~".*thanos-rule.*"}[5m])) > 0',
                  severity: "info",
                  for: "15m",
                  content:
                    '- alert: ThanosRuleHighRuleEvaluationWarnings\r\n      expr: \'sum by (job, instance) (rate(thanos_rule_evaluation_with_warnings_total{job=~".*thanos-rule.*"}[5m])) > 0\'\r\n      for: 15m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Thanos Rule High Rule Evaluation Warnings (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} has high number of evaluation warnings.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Rule Evaluation Latency High",
                  description:
                    "Thanos Rule {{$labels.instance}} has higher evaluation latency than interval for {{$labels.rule_group}}.",
                  query:
                    '(sum by (job, instance, rule_group) (prometheus_rule_group_last_duration_seconds{job=~".*thanos-rule.*"}) > sum by (job, instance, rule_group) (prometheus_rule_group_interval_seconds{job=~".*thanos-rule.*"}))',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleRuleEvaluationLatencyHigh\r\n      expr: \'(sum by (job, instance, rule_group) (prometheus_rule_group_last_duration_seconds{job=~".*thanos-rule.*"}) > sum by (job, instance, rule_group) (prometheus_rule_group_interval_seconds{job=~".*thanos-rule.*"}))\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Rule Rule Evaluation Latency High (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} has higher evaluation latency than interval for {{$labels.rule_group}}.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Grpc Error Rate",
                  description:
                    "Thanos Rule {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.",
                  query:
                    '(sum by (job, instance) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-rule.*"}[5m]))/  sum by (job, instance) (rate(grpc_server_started_total{job=~".*thanos-rule.*"}[5m])) * 100 > 5)',
                  severity: "warning",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleGrpcErrorRate\r\n      expr: \'(sum by (job, instance) (rate(grpc_server_handled_total{grpc_code=~"Unknown|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded", job=~".*thanos-rule.*"}[5m]))/  sum by (job, instance) (rate(grpc_server_started_total{job=~".*thanos-rule.*"}[5m])) * 100 > 5)\'\r\n      for: 5m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Rule Grpc Error Rate (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.job}} is failing to handle {{$value | humanize}}% of requests.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Config Reload Failure",
                  description:
                    "Thanos Rule {{$labels.job}} has not been able to reload its configuration.",
                  query:
                    'avg by (job, instance) (thanos_rule_config_last_reload_successful{job=~".*thanos-rule.*"}) != 1',
                  severity: "info",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleConfigReloadFailure\r\n      expr: \'avg by (job, instance) (thanos_rule_config_last_reload_successful{job=~".*thanos-rule.*"}) != 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Thanos Rule Config Reload Failure (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.job}} has not been able to reload its configuration.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Query High D N S Failures",
                  description:
                    "Thanos Rule {{$labels.job}} has {{$value | humanize}}% of failing DNS queries for query endpoints.",
                  query:
                    '(sum by (job, instance) (rate(thanos_rule_query_apis_dns_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(thanos_rule_query_apis_dns_lookups_total{job=~".*thanos-rule.*"}[5m])) * 100 > 1)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosRuleQueryHighDNSFailures\r\n      expr: \'(sum by (job, instance) (rate(thanos_rule_query_apis_dns_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(thanos_rule_query_apis_dns_lookups_total{job=~".*thanos-rule.*"}[5m])) * 100 > 1)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Rule Query High D N S Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.job}} has {{$value | humanize}}% of failing DNS queries for query endpoints.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Alertmanager High D N S Failures",
                  description:
                    "Thanos Rule {{$labels.instance}} has {{$value | humanize}}% of failing DNS queries for Alertmanager endpoints.",
                  query:
                    '(sum by (job, instance) (rate(thanos_rule_alertmanagers_dns_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(thanos_rule_alertmanagers_dns_lookups_total{job=~".*thanos-rule.*"}[5m])) * 100 > 1)',
                  severity: "warning",
                  for: "15m",
                  content:
                    '- alert: ThanosRuleAlertmanagerHighDNSFailures\r\n      expr: \'(sum by (job, instance) (rate(thanos_rule_alertmanagers_dns_failures_total{job=~".*thanos-rule.*"}[5m])) / sum by (job, instance) (rate(thanos_rule_alertmanagers_dns_lookups_total{job=~".*thanos-rule.*"}[5m])) * 100 > 1)\'\r\n      for: 15m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Thanos Rule Alertmanager High D N S Failures (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} has {{$value | humanize}}% of failing DNS queries for Alertmanager endpoints.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule No Evaluation For10 Intervals",
                  description:
                    "Thanos Rule {{$labels.job}} has rule groups that did not evaluate for at least 10x of their expected interval.",
                  query:
                    'time() -  max by (job, instance, group) (prometheus_rule_group_last_evaluation_timestamp_seconds{job=~".*thanos-rule.*"})>10 * max by (job, instance, group) (prometheus_rule_group_interval_seconds{job=~".*thanos-rule.*"})',
                  severity: "info",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleNoEvaluationFor10Intervals\r\n      expr: \'time() -  max by (job, instance, group) (prometheus_rule_group_last_evaluation_timestamp_seconds{job=~".*thanos-rule.*"})>10 * max by (job, instance, group) (prometheus_rule_group_interval_seconds{job=~".*thanos-rule.*"})\'\r\n      for: 5m\r\n      labels:\r\n        severity: info\r\n      annotations:\r\n        summary: Thanos Rule No Evaluation For10 Intervals (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.job}} has rule groups that did not evaluate for at least 10x of their expected interval.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos No Rule Evaluations",
                  description:
                    "Thanos Rule {{$labels.instance}} did not perform any rule evaluations in the past 10 minutes.",
                  query:
                    'sum by (job, instance) (rate(prometheus_rule_evaluations_total{job=~".*thanos-rule.*"}[5m])) <= 0  and sum by (job, instance) (thanos_rule_loaded_rules{job=~".*thanos-rule.*"}) > 0',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosNoRuleEvaluations\r\n      expr: \'sum by (job, instance) (rate(prometheus_rule_evaluations_total{job=~".*thanos-rule.*"}[5m])) <= 0  and sum by (job, instance) (thanos_rule_loaded_rules{job=~".*thanos-rule.*"}) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos No Rule Evaluations (instance {{ $labels.instance }})\r\n        description: "Thanos Rule {{$labels.instance}} did not perform any rule evaluations in the past 10 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Bucket Replicate",
              slug: "thanos-bucket-replicate",
              rules: [
                {
                  name: "Thanos Bucket Replicate Error Rate",
                  description:
                    "Thanos Replicate is failing to run, {{$value | humanize}}% of attempts failed.",
                  query:
                    '(sum by (job) (rate(thanos_replicate_replication_runs_total{result="error", job=~".*thanos-bucket-replicate.*"}[5m]))/ on (job) group_left  sum by (job) (rate(thanos_replicate_replication_runs_total{job=~".*thanos-bucket-replicate.*"}[5m]))) * 100 >= 10',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosBucketReplicateErrorRate\r\n      expr: \'(sum by (job) (rate(thanos_replicate_replication_runs_total{result="error", job=~".*thanos-bucket-replicate.*"}[5m]))/ on (job) group_left  sum by (job) (rate(thanos_replicate_replication_runs_total{job=~".*thanos-bucket-replicate.*"}[5m]))) * 100 >= 10\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Bucket Replicate Error Rate (instance {{ $labels.instance }})\r\n        description: "Thanos Replicate is failing to run, {{$value | humanize}}% of attempts failed.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Bucket Replicate Run Latency",
                  description:
                    "Thanos Replicate {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for the replicate operations.",
                  query:
                    '(histogram_quantile(0.99, sum by (job) (rate(thanos_replicate_replication_run_duration_seconds_bucket{job=~".*thanos-bucket-replicate.*"}[5m]))) > 20 and  sum by (job) (rate(thanos_replicate_replication_run_duration_seconds_bucket{job=~".*thanos-bucket-replicate.*"}[5m])) > 0)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosBucketReplicateRunLatency\r\n      expr: \'(histogram_quantile(0.99, sum by (job) (rate(thanos_replicate_replication_run_duration_seconds_bucket{job=~".*thanos-bucket-replicate.*"}[5m]))) > 20 and  sum by (job) (rate(thanos_replicate_replication_run_duration_seconds_bucket{job=~".*thanos-bucket-replicate.*"}[5m])) > 0)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Bucket Replicate Run Latency (instance {{ $labels.instance }})\r\n        description: "Thanos Replicate {{$labels.job}} has a 99th percentile latency of {{$value}} seconds for the replicate operations.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
            {
              name: "Thanos Component Absent",
              slug: "thanos-component-absent",
              rules: [
                {
                  name: "Thanos Compact Is Down",
                  description:
                    "ThanosCompact has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-compact.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosCompactIsDown\r\n      expr: \'absent(up{job=~".*thanos-compact.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Compact Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosCompact has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Query Is Down",
                  description:
                    "ThanosQuery has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-query.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosQueryIsDown\r\n      expr: \'absent(up{job=~".*thanos-query.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Query Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosQuery has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Receive Is Down",
                  description:
                    "ThanosReceive has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-receive.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosReceiveIsDown\r\n      expr: \'absent(up{job=~".*thanos-receive.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Receive Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosReceive has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Rule Is Down",
                  description:
                    "ThanosRule has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-rule.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosRuleIsDown\r\n      expr: \'absent(up{job=~".*thanos-rule.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Rule Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosRule has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Sidecar Is Down",
                  description:
                    "ThanosSidecar has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-sidecar.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosSidecarIsDown\r\n      expr: \'absent(up{job=~".*thanos-sidecar.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Sidecar Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosSidecar has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Thanos Store Is Down",
                  description:
                    "ThanosStore has disappeared. Prometheus target for the component cannot be discovered.",
                  query: 'absent(up{job=~".*thanos-store.*"} == 1)',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: ThanosStoreIsDown\r\n      expr: \'absent(up{job=~".*thanos-store.*"} == 1)\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Thanos Store Is Down (instance {{ $labels.instance }})\r\n        description: "ThanosStore has disappeared. Prometheus target for the component cannot be discovered.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Loki",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Loki process too many restarts",
                  description:
                    "A loki process had too many restarts (target {{ $labels.instance }})",
                  query:
                    'changes(process_start_time_seconds{job=~".*loki.*"}[15m]) > 2',
                  severity: "warning",
                  content:
                    '- alert: LokiProcessTooManyRestarts\r\n      expr: \'changes(process_start_time_seconds{job=~".*loki.*"}[15m]) > 2\'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Loki process too many restarts (instance {{ $labels.instance }})\r\n        description: "A loki process had too many restarts (target {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Loki request errors",
                  description:
                    "The {{ $labels.job }} and {{ $labels.route }} are experiencing errors",
                  query:
                    '100 * sum(rate(loki_request_duration_seconds_count{status_code=~"5.."}[1m])) by (namespace, job, route) / sum(rate(loki_request_duration_seconds_count[1m])) by (namespace, job, route) > 10',
                  severity: "critical",
                  for: "15m",
                  content:
                    '- alert: LokiRequestErrors\r\n      expr: \'100 * sum(rate(loki_request_duration_seconds_count{status_code=~"5.."}[1m])) by (namespace, job, route) / sum(rate(loki_request_duration_seconds_count[1m])) by (namespace, job, route) > 10\'\r\n      for: 15m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Loki request errors (instance {{ $labels.instance }})\r\n        description: "The {{ $labels.job }} and {{ $labels.route }} are experiencing errors\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Loki request panic",
                  description:
                    'The {{ $labels.job }} is experiencing {{ printf "%.2f" $value }}% increase of panics',
                  query:
                    "sum(increase(loki_panic_total[10m])) by (namespace, job) > 0",
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: LokiRequestPanic\r\n      expr: \'sum(increase(loki_panic_total[10m])) by (namespace, job) > 0\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Loki request panic (instance {{ $labels.instance }})\r\n        description: "The {{ $labels.job }} is experiencing {{ printf "%.2f" $value }}% increase of panics\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Loki request latency",
                  description:
                    'The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency',
                  query:
                    '(histogram_quantile(0.99, sum(rate(loki_request_duration_seconds_bucket{route!~"(?i).*tail.*"}[5m])) by (le)))  > 1',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: LokiRequestLatency\r\n      expr: \'(histogram_quantile(0.99, sum(rate(loki_request_duration_seconds_bucket{route!~"(?i).*tail.*"}[5m])) by (le)))  > 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Loki request latency (instance {{ $labels.instance }})\r\n        description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Promtail",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Promtail request errors",
                  description:
                    'The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}% errors.',
                  query:
                    '100 * sum(rate(promtail_request_duration_seconds_count{status_code=~"5..|failed"}[1m])) by (namespace, job, route, instance) / sum(rate(promtail_request_duration_seconds_count[1m])) by (namespace, job, route, instance) > 10',
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: PromtailRequestErrors\r\n      expr: \'100 * sum(rate(promtail_request_duration_seconds_count{status_code=~"5..|failed"}[1m])) by (namespace, job, route, instance) / sum(rate(promtail_request_duration_seconds_count[1m])) by (namespace, job, route, instance) > 10\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Promtail request errors (instance {{ $labels.instance }})\r\n        description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}% errors.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Promtail request latency",
                  description:
                    'The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency.',
                  query:
                    "histogram_quantile(0.99, sum(rate(promtail_request_duration_seconds_bucket[5m])) by (le)) > 1",
                  severity: "critical",
                  for: "5m",
                  content:
                    '- alert: PromtailRequestLatency\r\n      expr: \'histogram_quantile(0.99, sum(rate(promtail_request_duration_seconds_bucket[5m])) by (le)) > 1\'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Promtail request latency (instance {{ $labels.instance }})\r\n        description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
              ],
            },
          ],
        },
        {
          name: "Cortex",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Cortex ruler configuration reload failure",
                  description:
                    "Cortex ruler configuration reload failure (instance {{ $labels.instance }})",
                  query: "cortex_ruler_config_last_reload_successful != 1",
                  severity: "warning",
                  content:
                    "- alert: CortexRulerConfigurationReloadFailure\r\n      expr: 'cortex_ruler_config_last_reload_successful != 1'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Cortex ruler configuration reload failure (instance {{ $labels.instance }})\r\n        description: \"Cortex ruler configuration reload failure (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cortex not connected to Alertmanager",
                  description:
                    "Cortex not connected to Alertmanager (instance {{ $labels.instance }})",
                  query:
                    "cortex_prometheus_notifications_alertmanagers_discovered < 1",
                  severity: "critical",
                  content:
                    "- alert: CortexNotConnectedToAlertmanager\r\n      expr: 'cortex_prometheus_notifications_alertmanagers_discovered < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cortex not connected to Alertmanager (instance {{ $labels.instance }})\r\n        description: \"Cortex not connected to Alertmanager (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cortex notification are being dropped",
                  description:
                    "Cortex notification are being dropped due to errors (instance {{ $labels.instance }})",
                  query:
                    "rate(cortex_prometheus_notifications_dropped_total[5m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: CortexNotificationAreBeingDropped\r\n      expr: 'rate(cortex_prometheus_notifications_dropped_total[5m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cortex notification are being dropped (instance {{ $labels.instance }})\r\n        description: \"Cortex notification are being dropped due to errors (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cortex notification error",
                  description:
                    "Cortex is failing when sending alert notifications (instance {{ $labels.instance }})",
                  query:
                    "rate(cortex_prometheus_notifications_errors_total[5m]) > 0",
                  severity: "critical",
                  content:
                    "- alert: CortexNotificationError\r\n      expr: 'rate(cortex_prometheus_notifications_errors_total[5m]) > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cortex notification error (instance {{ $labels.instance }})\r\n        description: \"Cortex is failing when sending alert notifications (instance {{ $labels.instance }})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Cortex ingester unhealthy",
                  description: "Cortex has an unhealthy ingester",
                  query:
                    'cortex_ring_members{state="Unhealthy", name="ingester"} > 0',
                  severity: "critical",
                  content:
                    '- alert: CortexIngesterUnhealthy\r\n      expr: \'cortex_ring_members{state="Unhealthy", name="ingester"} > 0\'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cortex ingester unhealthy (instance {{ $labels.instance }})\r\n        description: "Cortex has an unhealthy ingester\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"',
                },
                {
                  name: "Cortex frontend queries stuck",
                  description: "There are queued up queries in query-frontend.",
                  query:
                    "sum by (job) (cortex_query_frontend_queue_length) > 0",
                  severity: "critical",
                  for: "5m",
                  content:
                    "- alert: CortexFrontendQueriesStuck\r\n      expr: 'sum by (job) (cortex_query_frontend_queue_length) > 0'\r\n      for: 5m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Cortex frontend queries stuck (instance {{ $labels.instance }})\r\n        description: \"There are queued up queries in query-frontend.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Jenkins",
          exporters: [
            {
              name: "Metric plugin",
              slug: "metric-plugin",
              doc_url: "https://plugins.jenkins.io/prometheus/",
              rules: [
                {
                  name: "Jenkins offline",
                  description:
                    "Jenkins offline: `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})",
                  query: "jenkins_node_offline_value > 1",
                  severity: "critical",
                  content:
                    "- alert: JenkinsOffline\r\n      expr: 'jenkins_node_offline_value > 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Jenkins offline (instance {{ $labels.instance }})\r\n        description: \"Jenkins offline: `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins healthcheck",
                  description:
                    "Jenkins healthcheck score: {{$value}}. Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})",
                  query: "jenkins_health_check_score < 1",
                  severity: "critical",
                  content:
                    "- alert: JenkinsHealthcheck\r\n      expr: 'jenkins_health_check_score < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Jenkins healthcheck (instance {{ $labels.instance }})\r\n        description: \"Jenkins healthcheck score: {{$value}}. Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins outdated plugins",
                  description: "{{ $value }} plugins need update",
                  query: "sum(jenkins_plugins_withUpdate) by (instance) > 3",
                  severity: "warning",
                  for: "1d",
                  content:
                    "- alert: JenkinsOutdatedPlugins\r\n      expr: 'sum(jenkins_plugins_withUpdate) by (instance) > 3'\r\n      for: 1d\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Jenkins outdated plugins (instance {{ $labels.instance }})\r\n        description: \"{{ $value }} plugins need update\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins builds health score",
                  description:
                    "Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})",
                  query: "default_jenkins_builds_health_score < 1",
                  severity: "critical",
                  content:
                    "- alert: JenkinsBuildsHealthScore\r\n      expr: 'default_jenkins_builds_health_score < 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Jenkins builds health score (instance {{ $labels.instance }})\r\n        description: \"Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins run failure total",
                  description:
                    "Job run failures: ({{$value}}) {{$labels.jenkins_job}}. Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})",
                  query: "delta(jenkins_runs_failure_total[1h]) > 100",
                  severity: "warning",
                  content:
                    "- alert: JenkinsRunFailureTotal\r\n      expr: 'delta(jenkins_runs_failure_total[1h]) > 100'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Jenkins run failure total (instance {{ $labels.instance }})\r\n        description: \"Job run failures: ({{$value}}) {{$labels.jenkins_job}}. Healthcheck failure for `{{$labels.instance}}` in realm {{$labels.realm}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins build tests failing",
                  description:
                    "Last build tests failed: {{$labels.jenkins_job}}. Failed build Tests for job `{{$labels.jenkins_job}}` on {{$labels.instance}}/{{$labels.env}} ({{$labels.region}})",
                  query: "default_jenkins_builds_last_build_tests_failing > 0",
                  severity: "warning",
                  content:
                    "- alert: JenkinsBuildTestsFailing\r\n      expr: 'default_jenkins_builds_last_build_tests_failing > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Jenkins build tests failing (instance {{ $labels.instance }})\r\n        description: \"Last build tests failed: {{$labels.jenkins_job}}. Failed build Tests for job `{{$labels.jenkins_job}}` on {{$labels.instance}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Jenkins last build failed",
                  description:
                    "Last build failed: {{$labels.jenkins_job}}. Failed build for job `{{$labels.jenkins_job}}` on {{$labels.instance}}/{{$labels.env}} ({{$labels.region}})",
                  query:
                    "default_jenkins_builds_last_build_result_ordinal == 2",
                  severity: "warning",
                  comments:
                    "* RUNNING  -1 true  - The build had no errors.\n* SUCCESS   0 true  - The build had no errors.\n* UNSTABLE  1 true  - The build had some errors but they were not fatal. For example, some tests failed.\n* FAILURE   2 false - The build had a fatal error.\n* NOT_BUILT 3 false - The module was not built.\n* ABORTED   4 false - The build was manually aborted.\n",
                  content:
                    "# * RUNNING  -1 true  - The build had no errors.\n* SUCCESS   0 true  - The build had no errors.\n* UNSTABLE  1 true  - The build had some errors but they were not fatal. For example, some tests failed.\n* FAILURE   2 false - The build had a fatal error.\n* NOT_BUILT 3 false - The module was not built.\n* ABORTED   4 false - The build was manually aborted.\r\n    - alert: JenkinsLastBuildFailed\r\n      expr: 'default_jenkins_builds_last_build_result_ordinal == 2'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Jenkins last build failed (instance {{ $labels.instance }})\r\n        description: \"Last build failed: {{$labels.jenkins_job}}. Failed build for job `{{$labels.jenkins_job}}` on {{$labels.instance}}/{{$labels.env}} ({{$labels.region}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "APC UPS",
          exporters: [
            {
              name: "mdlayher/apcupsd_exporter",
              slug: "apcupsd_exporter",
              doc_url: "https://github.com/mdlayher/apcupsd_exporter",
              rules: [
                {
                  name: "APC UPS Battery nearly empty",
                  description: "Battery is almost empty (< 10% left)",
                  query: "apcupsd_battery_charge_percent < 10",
                  severity: "critical",
                  content:
                    "- alert: ApcUpsBatteryNearlyEmpty\r\n      expr: 'apcupsd_battery_charge_percent < 10'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: APC UPS Battery nearly empty (instance {{ $labels.instance }})\r\n        description: \"Battery is almost empty (< 10% left)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "APC UPS Less than 15 Minutes of battery time remaining",
                  description:
                    "Battery is almost empty (< 15 Minutes remaining)",
                  query: "apcupsd_battery_time_left_seconds < 900",
                  severity: "critical",
                  content:
                    "- alert: ApcUpsLessThan15MinutesOfBatteryTimeRemaining\r\n      expr: 'apcupsd_battery_time_left_seconds < 900'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: APC UPS Less than 15 Minutes of battery time remaining (instance {{ $labels.instance }})\r\n        description: \"Battery is almost empty (< 15 Minutes remaining)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "APC UPS AC input outage",
                  description:
                    "UPS now running on battery (since {{$value | humanizeDuration}})",
                  query: "apcupsd_battery_time_on_seconds > 0",
                  severity: "warning",
                  content:
                    "- alert: ApcUpsAcInputOutage\r\n      expr: 'apcupsd_battery_time_on_seconds > 0'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: APC UPS AC input outage (instance {{ $labels.instance }})\r\n        description: \"UPS now running on battery (since {{$value | humanizeDuration}})\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "APC UPS low battery voltage",
                  description: "Battery voltage is lower than nominal (< 95%)",
                  query:
                    "(apcupsd_battery_volts / apcupsd_battery_nominal_volts) < 0.95",
                  severity: "warning",
                  content:
                    "- alert: ApcUpsLowBatteryVoltage\r\n      expr: '(apcupsd_battery_volts / apcupsd_battery_nominal_volts) < 0.95'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: APC UPS low battery voltage (instance {{ $labels.instance }})\r\n        description: \"Battery voltage is lower than nominal (< 95%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "APC UPS high temperature",
                  description: "Internal temperature is high ({{$value}}°C)",
                  query: "apcupsd_internal_temperature_celsius >= 40",
                  severity: "warning",
                  for: "2m",
                  content:
                    "- alert: ApcUpsHighTemperature\r\n      expr: 'apcupsd_internal_temperature_celsius >= 40'\r\n      for: 2m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: APC UPS high temperature (instance {{ $labels.instance }})\r\n        description: \"Internal temperature is high ({{$value}}°C)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "APC UPS high load",
                  description: "UPS load is > 80%",
                  query: "apcupsd_ups_load_percent > 80",
                  severity: "warning",
                  content:
                    "- alert: ApcUpsHighLoad\r\n      expr: 'apcupsd_ups_load_percent > 80'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: APC UPS high load (instance {{ $labels.instance }})\r\n        description: \"UPS load is > 80%\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
        {
          name: "Graph Node",
          exporters: [
            {
              name: "Embedded exporter",
              slug: "embedded-exporter",
              rules: [
                {
                  name: "Provider failed because net_version failed",
                  description:
                    "Failed net_version for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`",
                  query: "eth_rpc_status == 1",
                  severity: "critical",
                  content:
                    "- alert: ProviderFailedBecauseNet_versionFailed\r\n      expr: 'eth_rpc_status == 1'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Provider failed because net_version failed (instance {{ $labels.instance }})\r\n        description: \"Failed net_version for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Provider failed because get genesis failed",
                  description:
                    "Failed to get genesis for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`",
                  query: "eth_rpc_status == 2",
                  severity: "critical",
                  content:
                    "- alert: ProviderFailedBecauseGetGenesisFailed\r\n      expr: 'eth_rpc_status == 2'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Provider failed because get genesis failed (instance {{ $labels.instance }})\r\n        description: \"Failed to get genesis for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Provider failed because net_version timeout",
                  description:
                    "net_version timeout for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`",
                  query: "eth_rpc_status == 3",
                  severity: "critical",
                  content:
                    "- alert: ProviderFailedBecauseNet_versionTimeout\r\n      expr: 'eth_rpc_status == 3'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Provider failed because net_version timeout (instance {{ $labels.instance }})\r\n        description: \"net_version timeout for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Provider failed because get genesis timeout",
                  description:
                    "Timeout to get genesis for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`",
                  query: "eth_rpc_status == 4",
                  severity: "critical",
                  content:
                    "- alert: ProviderFailedBecauseGetGenesisTimeout\r\n      expr: 'eth_rpc_status == 4'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Provider failed because get genesis timeout (instance {{ $labels.instance }})\r\n        description: \"Timeout to get genesis for Provider `{{$labels.provider}}` in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Store connection is too slow",
                  description:
                    "Store connection is too slow to `{{$labels.pool}}` pool, `{{$labels.shard}}` shard in Graph node `{{$labels.instance}}`",
                  query: "store_connection_wait_time_ms > 10",
                  severity: "warning",
                  content:
                    "- alert: StoreConnectionIsTooSlow\r\n      expr: 'store_connection_wait_time_ms > 10'\r\n      for: 0m\r\n      labels:\r\n        severity: warning\r\n      annotations:\r\n        summary: Store connection is too slow (instance {{ $labels.instance }})\r\n        description: \"Store connection is too slow to `{{$labels.pool}}` pool, `{{$labels.shard}}` shard in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
                {
                  name: "Store connection is too slow",
                  description:
                    "Store connection is too slow to `{{$labels.pool}}` pool, `{{$labels.shard}}` shard in Graph node `{{$labels.instance}}`",
                  query: "store_connection_wait_time_ms > 20",
                  severity: "critical",
                  content:
                    "- alert: StoreConnectionIsTooSlow\r\n      expr: 'store_connection_wait_time_ms > 20'\r\n      for: 0m\r\n      labels:\r\n        severity: critical\r\n      annotations:\r\n        summary: Store connection is too slow (instance {{ $labels.instance }})\r\n        description: \"Store connection is too slow to `{{$labels.pool}}` pool, `{{$labels.shard}}` shard in Graph node `{{$labels.instance}}`\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}\"",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
