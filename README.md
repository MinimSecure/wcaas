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

## Backend WiFi Service Notes

The Backend WiFi service is what monitors the connection store and takes action based on the stored model state.

### Connection workflow

Pending -> Connected -> Disconnecting -> Disconnected

#### Pending

If the WiFi service isn't acting on a connected connection, it grabs then next pending one from the connection store and marks it as connected.

#### Connected

When the service has a claimed connection in the connected state that means that it should be getting it associated with the wifi network, and willl then be processing actions for it.

#### Disconnecting

If a connection a service is processing enters this state it means that a client has told us that they are finished and we can disconnect the connection and move on.

#### Disconnected

The service is finished with this connection. It can enter this state either through an Error in the connection transaction (such as a timeout), or the it had cleanly been disconnected via a request from the client.
