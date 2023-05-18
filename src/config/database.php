<?php
    class Database{
        //Properties
        private $host = 'localhost';
        private $user = 'root';
        private $password = 'myadmin123';
        private $dbname = 'universities';

        //Connections
        public function connect(){
            $con = mysqli_connect($this->host, $this->user, $this->password, $this->dbname);
            
            if (!$con) {
                die("Connection failed: " . mysqli_connect_error());
            }
            return $con;
        }

        public function closeConnection($con){
            mysqli_close($con);
        }

        // Select Query
        public function selectQuery($id = null){
            $sql = "SELECT * FROM tblstudents";
            $data = null;
            if($id != null){
                $sql = "SELECT * FROM tblstudents WHERE id = $id";
            }
            //Connect Database
            $connect = $this->connect();
            //Execute Query
            $result = mysqli_query($connect, $sql);
        
            //Check number of row
            if (mysqli_num_rows($result) > 0) {
                // Fetch each data (mysqli_fetch_all get assosiative and value array)
                while($row = mysqli_fetch_all($result, MYSQLI_ASSOC)) {
                    $data = $row;
                }
            } 
            else {
                $data[0] = "0 results";
            }
            mysqli_free_result($result);
            $this->closeConnection($connect);
            return json_encode($data);
        }

        // Insert Query
        public function insertQuery($data){
            $value = json_decode($data, TRUE); // Convert to JSON
            $response = [];
            $connect = $this->connect();
            $sql = "INSERT INTO tblstudents (firstname, middlename, lastname, address, birthday, course, yearlevel) VALUES (?,?,?,?,?,?,?)";

            //Connect Database
            $connect = $this->connect();

            //Execute Query
            if($stmt = mysqli_prepare($connect, $sql)){
                mysqli_stmt_bind_param($stmt, "ssssssi", $first_name, $middle_name, $last_name, $address, $birthday, $course, $year);
                
                $first_name = $value['firstname'];  
                $middle_name = $value['middlename']; 
                $last_name = $value['lastname']; 
                $birthday =  $value['birthday'];    
                $address =  $value['address'];    
                $course =  $value['course'];    
                $year = $value['yearlevel']; 
                mysqli_stmt_execute($stmt);
                $response["messages"] = "Record Added: $first_name $last_name";
            }
            else{
                $response["messages"] = "Error: Could not prepare query";
            }

            mysqli_stmt_close($stmt);
            $this->closeConnection($connect);
            return json_encode($response);
        }

        // Update Query
        public function updateQuery($data, $id){
            $value = json_decode($data, TRUE); // Convert to JSON
            $response = [];

            if(!(empty($id))){
                $first_name = $value['firstname'];  
                $middle_name = $value['middlename']; 
                $last_name = $value['lastname']; 
                $birthday =  $value['birthday'];    
                $address =  $value['address'];    
                $course =  $value['course'];    
                $year = $value['yearlevel']; 
                $sql = "UPDATE tblstudents SET firstname = '$first_name', middlename = '$middle_name', lastname = '$last_name', address = '$address', birthday = '$birthday', course = '$course', yearlevel = $year WHERE id = $id";

            }

            //Connect Database
            $connect = $this->connect();

            //Execute Query
            if (mysqli_query($connect, $sql)) {
                $response["messages"] = "Record Updated: $first_name $last_name";
            } 
            else {
                $response["messages"] = "Error: Could not work this query";
            }

            $this->closeConnection($connect);
            return json_encode($response);
        }
        // Delete Query
        public function deleteQuery($id){
            $response = [];

            if(!(empty($id))){
                $sql = "DELETE FROM tblstudents WHERE id = $id";
            }
            else{
                die("");
                $response["messages"] = "ID was missing";
            }

            //Connect Database
            $connect = $this->connect();
            //Execute Query
            if (mysqli_query($connect, $sql)) {
                $response["messages"] = "Record Deleted Successfully";
            } 
            else {
                $response["messages"] = "Error: Could not work this query";
            }

            $this->closeConnection($connect);
            return json_encode($response);
        }
    }
