<?
class ckSimpleParser {
	var $data='';
	var $secptr = -1;
	var $secdata='';
	var $secstack = array();

	function hasSoapError(){
		$b = strpos($this->data, 'soap-env:Fault');
		if($b == false) return false;
		return true;
	}
	function readSection($name){
		if (!ereg("<$name>(.*)</$name>" ,$this->data ,$match)) return 0;
		$this->secdata = $match[1];
		return 1;
	}
	function getSectionProperty($name){
		$data = $this->secdata;
		if (!ereg("<$name>(.*)</$name>" ,$data ,$match)) return 0;
		return  dencodeHT($match[1]);
	}
	function sectionHasProperty($name){
		$data = $this->secdata;
		if (!ereg("<$name>(.*)</$name>" ,$data ,$match)) return 0;
		return 1;
	}
	function getProperty($name){
		$data = $this->data;
		if(__DEBUGSCREEN > 0) print "\nData<br><pre>$data</pre><br>";
		if (!ereg("<$name>(.*)</$name>" ,$data ,$match)) return 0;
		if(__DEBUGSCREEN > 0) print "Matched($name): [" . $match[1] . "]<br>";
		if(__DEBUGSCREEN > 0) print "Decoded: [" .  dencodeHT($match[1]) . "]<br>";
		return  dencodeHT($match[1]);
	}
	function hasProperty($name){
		$data = $this->data;
		if (!ereg("<$name>(.*)</$name>" ,$data ,$match)) return 0;
		return 1;
	}
}

function encodeHT($s){
	return htmlentities($s);
}
function dencodeHT($s){
	return html_entity_decode($s);
}

?>
