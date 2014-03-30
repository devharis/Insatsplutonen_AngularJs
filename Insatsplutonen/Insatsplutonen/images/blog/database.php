<?php
	
	class cDatabase
	{
		// >>> Constants <<<
		var $sServer;
		var $sDatabaseName;
		var $sUsername;
		var $sPassword;
		var $sServerType;
	
		// >>> General <<<
		var $conn;
		var $bIsConnected;
	
		
		// ---------------------------------------------------------------
		// >> cDatabase [CONSTRUCTOR] <<
		
		function cDatabase($sServer, $sDatabaseName, $sUsername, $sPassword, $sServerType)
		{
			$this->sServer = $sServer;
			$this->sDatabaseName = $sDatabaseName;
			$this->sUsername = $sUsername;
			$this->sPassword = $sPassword;
			$this->sServerType = strtolower($sServerType);
	
			$this->bIsConnected = false;
		}
		
		
		// ---------------------------------------------------------------
		// >> connect <<
		
		function connect()
		{
			
			// Do not connect if already connected
			
			if ( !$this->bIsConnected )
			{
							
				$this->conn = @mysql_connect($this->sServer, $this->sUsername, $this->sPassword);
		
				//Failed?
			  	if (!$this->conn)
				{
					echo "connect - failed<br>";
					return false;
				}
						
				$bSuccess = @mysql_select_db($this->sDatabaseName, $this->conn);
				
				//Failed?
		 		if ( !$bSuccess )
				{
					echo "select_db - failed<br>";
					return false;
				}
				
				
				$this->bIsConnected = true;
			}
	
			return true;
		}
		
		
		// ---------------------------------------------------------------
		// >> query <<
	
		function query($sSql)
		{
			// If not connected, we open a new connection
			if ( !$this->bIsConnected )
				$bIsConnected = $this->connect();
			else
				$bIsConnected = true;
			
			// If connected execute query
			if ( $bIsConnected )
			{
				//Execute query
				if ($this->sServerType == "mysql")
					return mysql_query($sSql, $this->conn);
				else
					return mssql_query($sSql, $this->conn);
			}
			else
			{
				return false;	
			}
		}
	
	
		// ---------------------------------------------------------------
		// >> fetchArray <<
	
		function fetchArray(&$result)
		{
			return mysql_fetch_array($result);
		}
		
		
		// ---------------------------------------------------------------
		// >> numRows <<
	
		function numRows(&$result)
		{
			//Fetch array
			if ($this->sServerType == "mysql")
				return mysql_num_rows($result);
			else
				return mssql_num_rows($result);
		}
		
		
		// ---------------------------------------------------------------
		// >> sqlEncode <<
		
		function sqlEncode($sText)
		{
			$sOutput = "";
			
			if ( !is_null($sText) && isset($sText) )
			{
				if ($this->sServerType == "mysql")
					$sOutput = addslashes($sText);
				else
					$sOutput = str_replace("'", "''", $sText);
			}
			
			return $sOutput;
		}
		
		
	}

	// Create global database object
	$g_Db =& new cDatabase($g_sDbServer, $g_sDbName, $g_sDbUsername, $g_sDbPassword, $g_sDbServerType);

?>
