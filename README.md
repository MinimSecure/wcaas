# WCAAS

The Wireless Client as a Service framework provides a shared interface to connect a WiFi client to a wireless Access Point and then perform various tasks when connected. It can be used as a shared resource so multiple sources can queue up requests but it will only handle one transaction at a time.

## Functionality

 - Scan for networks
 - connect as a client
 - Perform DNS lookups
 - Perform HTTP operations

## Workflow

 1. Establish a connection to a wireless access point. There will be an enforced timeout for the transaction.
 2. Within the scope of a connection transaction you can perform various operations such as DNS lookups, HTTP request, etc.
 3. Client should respectfully disconnect when they are finished in the transaction, but if they do not the service will forecully terminate the transaction.
