## Core Types



### User

represents a user of the system

```hs
data User = User {
    id :: Int
  , username :: String
  , password :: String
  }
```



### SessionManager

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

```hs
data SessionManager = SessionManager {
    sessions :: [Session]
  }
```



### AuthManager

manages user authentication
1 per session manager

```hs
data AuthManager
```



### Session

represents a session of the system owned by a user.
a user may have multiple sessions, however a user only interacts
with one session at a time. this object is also the main interaction point
for the user (after initial login and authentication). all commands issued,
either via window interaction or raw commands will route through a session object

```hs
data Session = Session {
    sid         :: Int
  , user        :: User
  , state       :: SessionState
  , procManager :: ProcessManager
  }
```



### ProcessManager

manages active processes in a session
1 per manager per session

```hs
data ProcessManager = ProcessManager {
    processes :: [Process]
  }
```



### Process

an active process
associated with a single program which it is an
instance of

```hs
data Process = Process {
    pid            :: Int,
    ctx            :: ExecutionContext,

  }

exec :: Process -> Program -> ProcessInput -> ExecutionContext
```



### Program

an object that produces execution contexts

```hs
data Program = Program {
    name :: String
  }
```



### ExecutionContext

the way a program gets executed. if the program is GUI based
the ctx will contain the Backbone View information and be responsible for
splicing in and removing the html from the DOM (also handling user events -
 click, mouseover, etc). if its a 'simple' program
such as the classic 'ls' or 'mkdir' program called from another program it
should return error/output string. it should be able to notify and be destructed
by the process responsible for it.
1 per process

```hs
data ExecutionContext = ExecutionContext {
    completed :: String
  , exitCode  :: Int
  , standardOutput :: String
  , standardError  :: String
  , windowInfo :: Maybe WindowInfo
  }
```


