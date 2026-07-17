FROM registry.access.redhat.com/ubi9/nodejs-22-minimal

USER root

RUN microdnf install -y --nodocs git && \
    microdnf clean all
