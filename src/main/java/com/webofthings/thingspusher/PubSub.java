/*
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */

package com.webofthings.thingspusher;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.atmosphere.annotation.Broadcast;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.jersey.Broadcastable;
import org.atmosphere.jersey.SuspendResponse;

/**
 * A very simple Pub/Sub using the Atmosphere framework.
 * @author <a href="http://www.guinard.org">Dominique Guinard</a>
 */
@Path("/pubsub/{topic}")
@Produces("text/plain")
public class PubSub {
    private @PathParam("topic") Broadcaster topic;

    @GET
    public SuspendResponse<String> subscribe() {
        return new SuspendResponse.SuspendResponseBuilder<String>()
                .broadcaster(topic)
                .outputComments(true)
                .addListener(new WSEventListener())
                .build();
    }

    @POST
    @Broadcast
    public Broadcastable publish(@FormParam("message") String message) {
        return new Broadcastable(message, topic);
    }

}
