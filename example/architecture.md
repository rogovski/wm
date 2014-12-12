## Core Types

### User
represents a user of the system
```hs
            user

                id
                username
                password





        manages sessions of the system
           responsible for spawning new sessions, removing sessions.
           is the first point of interaction for the user - a user will request
           authentication from the session manager (for a new session, or an existing one).
           the session manager will offload the auth request to the auth manager.
           if auth is successfull the manager will display a (possibly empty) list of sessions
           for the user to resume (if he/she created any at a previous time), and the option to
           create a new session. the user will select an option and the manager will
           return a reference of it to the user (if the user selects 'new session', the manager
           will first create a new session and store it internally). from that point on (untill 'logout'),
           the user will interact with this session object


            session manager

                sessions - collection of sessions





        manages user authentication
           1 per session manager

            authentication manager

                sessions - collection of sessions





        represents a session of the system owned by a user.
           a user may have multiple sessions, however a user only interacts
           with one session at a time. this object is also the main interaction point
           for the user (after initial login and authentication). all commands issued,
           either via window interaction or raw commands will route through a session object


            session

                sid
                uid - reference to the user who owns the session
                state - active | inactive





        manages active processes in a session
           1 per manager per session

            ProcessManager

                processes - collection of processes



