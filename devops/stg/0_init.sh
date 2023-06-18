#!/usr/bin/env bash

mkdir -p /data_lake/postgres-data

mkdir -p /data_lake/zookeeper/zookeeper-datalog
mkdir -p /data_lake/zookeeper/zookeeper-data
mkdir -p /data_lake/zookeeper/zookeeper-logs

mkdir -p /data_lake/object_storage
mkdir -p /data_lake/clickhouse-data

mkdir -p /data_lake/posthog/posthog
mkdir -p /data_lake/posthog/docker

cp -r ../../posthog/idl /data_lake/posthog/posthog/
cp -r ../../docker/clickhouse /data_lake/posthog/docker/
