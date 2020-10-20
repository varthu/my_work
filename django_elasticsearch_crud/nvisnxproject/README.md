# NVISNx 

 The NVISNx application currently supports
  - Python 3.6
  - Django 2.2.5
  - Elasticsearch 6.0.0


Questions:
----------

  1. Using MongoDB, say we had a set of documents that contained “user_id”, “password”, and “display_name”.  What query would you make if we wanted to collect all display names that start with the letter “a”?  Make sure the password doesn’t show up in the results.

      # Ans : db.collection.find({display_name:{$regex:/^a/}},{password:0})

  2. Using Linux, what would the command or set of commands look like to connect to an NFS system?

      # Ans :  mount -F nfs -r bee:/export/share/man /usr/man

  3. Say we have 30GB worth of data we need to ingest.  For either MongoDB or Elasticsearch, what would your strategy be to tackle the ingestion efficiently?
  
      # Ans : Elasticsearch is the best fit for handling used data like this and we can use their options like scaling with multiple sharding and nodes, we can also increase the memory allocation of heap to the JVM process and disable the swapping to prevent the memory being swapped by OS.