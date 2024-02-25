# Songs

## API End Points

### **Get Song**

#### Request

`GET` `/songs/{id}`
* `params.id` *integer* Unique id of the song.

#### Response

`200 OK` [*song*](#song) Song object of given id.

`400 BAD REQUEST` [*error*](#error) Invalid parameters given.

`404 NOT FOUND` [*error*](#error) Song with given id does not exist.

### **Get Many Songs**

#### Request

`GET` `/songs/`

#### Response

`200 OK` 
* `data` [*song[]*](#song) Array of Song objects.
* `count` *integer* Number of song objects matching query.

`400 BAD REQUEST` [*error*](#error) Invalid parameters given.

### **Create Song** [`Protected`](#protected)

#### Request

`POST` `/songs/`
* `body` [*songCreateDTO*](#songCreateDTO) Fields of song object to be created.

#### Response

`200 OK` [*song*](#song) Song object created.

`400 BAD REQUEST` [*error*](#error) Invalid parameters given.

`401 UNAUTHORIZED` [*error*](#error) User is unauthorized to perform action.

### **Update Song** [`Protected`](#protected)

#### Request

`PUT` `/songs/:id`
* `params.id` *integer* Unique id of the song.
* `body` [*songUpdateDTO*](#songUpdateDTO) Fields of song object to update.

#### Response

`200 OK` [*song*](#song) Song object updated.

`400 BAD REQUEST` [*error*](#error) Invalid parameters given.

`401 UNAUTHORIZED` [*error*](#error) User is unauthorized to perform action.

`404 NOT FOUND` [*error*](#error) Song with given id does not exist.

### **Delete Song** [`Protected`](#protected)

#### Request

`DELETE` `/songs/:id`
* `params.id` *integer* Unique id of the song.

#### Response

`200 OK` [*song*](#song) Song object deleted.

`400 BAD REQUEST` [*error*](#error) Invalid parameters given.

`401 UNAUTHORIZED` [*error*](#error) User is unauthorized to perform action.

`404 NOT FOUND` [*error*](#error) Song with given id does not exist.

## Appendix

### Types

<span id="error">`error`</span>
* `code` *integer* Error code, eg. 400, 404, 500.
* `message` *string* Details of the error.

<span id="song">`song`</span>
* `id` *integer* Unique identifier for object.
* `title` *string* The title of the song.
* `artist` *string* The name of the artist who performed the song.
* `createdAt` *Date* Date and time song object was created.
* `updatedAt` *Date* Date and time song object was most recently updated.
* `authodId` *integer* Unique identifier of user who created the song object.
* `body` *string* Details of the song including lyrics and chords.

<span id="songCreateDTO">`songCreateDTO`</span> Fields needed for creating song.
* `title` *string* The title of the song.
* `artist` *string* The name of the artist who performed the song.
* `body` *string* Details of the song including lyrics and chords.

<span id="songUpdateDTO">`songUpdateDTO`</span> Fields needed for updating song.
* `title` *string* The title of the song.
* `artist` *string* The name of the artist who performed the song.
* `body` *string* Details of the song including lyrics and chords.

### Protected

`Protected` keyword indicates endpoint requires authentication of user by passing JWT token to request header using `Bearer Token` format.

