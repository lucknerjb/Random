#!/usr/bin/perl
#
# Options
use Getopt::Long;
use IO::File;

# Some vars
my $length = 10;
my $verbose;
my $config_path = "{PATH TO SITES CONFIGURATION FILES FOR APACHE}";

# Get command line args
$opts = GetOptions(
	"domain=s"	=> \$domain, 	# string 
	"domains_dir=s"	=> \$domains_dir, 	# string 
	"file=s"		=> \$file, 		# string
	"verbose"	=> \$verbose	# flag
);

# Check for empty args
if ($domain eq ""){
	print "Please provide a valid domain name.";
	exit;
}

if ($domains_dir eq ""){
	print "Please provide a valid domains directory.";
	exit;
}

if ($file eq ""){
	print "Please provide a valid Template File name";
	exit;
}

# Open a file handle on the file to be read
$fh = IO::File->new($file, 'r');

# Read the contents of the file
$content = &read_text($fh);

# Close old file handle
undef $fh;

# Create the name of the new file
my $new_file = $domain;
$new_file =~ s/\./_/g; 

# Append the .conf
$new_file = $new_file . '.conf';

#Build file location
$new_file = $config_path . $new_file;

# Get current date
@months = qw(Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec);
@weekDays = qw(Sun Mon Tue Wed Thu Fri Sat Sun);
($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = localtime();
$year = 1900 + $yearOffset;

# Add leading 0 to day of month if less than 10
if ($dayOfMonth < 10){
	$dayOfMonth = "0" . $dayOfMonth;
}

# Add leading 0 to month if less than 10
if ($month < 10){
	$month = "0" . $month;
}

# Create the date needed to be used in the file's opening comments
$theDate = "$year$month$dayOfMonth";

# Open new file handle
$fh = IO::File->new("> $new_file");
if (defined $fh){
	$content = "# Created by XYZ Domain Creation Script\n" 
		. "# Domain: $domain\n"
		. "# Date: $theDate\n\n#########################################################\n\n"
		. $content;
	print $fh $content;	# Print $content into $fh
	undef $fh;
}else{
	print "Could not open $new_file";
}

#Create the domain directory or print errors if any
# {$!} contains errors if any
if (mkdir("/home/user123/$domains_dir/$domain", 0755) eq "0") { 
	print "Domain Directory Creation Error: <strong>" . $! . "</strong><br />";
	exit;
}

# Grab the information we need about the user responsible for this dir
($login, $pass, $uid, $gid) = getpwnam('user123')
	or die "User not in passwd file";

# CHOWN the dir to the proper user and group
chown $uid, $gid, "/home/user123/$domain";

print "code_1";

#---------------------------------------------------------------------- SUBS ---------------------------------------------------------

# Read text from a specified fiuser123 read_text {
	my $vhost_template = do {local $/; <$fh>};

	#Search for and replace the "www" in the domain if needed
	if ($domain =~ m/www/) {
		$domain =~ s/www.//g;	# Make sure to remove the trailing dot after WWW
	}

	#Search for and replace the "{DOMAIN}" in the VHost template string
	$new_vhost_content = &replace_tag('{DOMAIN}', $domain, $vhost_template);

	#Replace the domains dir while giving the updated vhost template content as the 3rd arg
	$new_vhost_content = &replace_tag('{DOMAINS_DIR}', $domains_dir, $new_vhost_content);

	return ($new_vhost_content);
}

# Replace domain name in file content
sub replace_tag {
	# Assign subroutine args to local vars
	$search = $_[0];
	$replace = $_[1];
	$haystack = $_[2];

	# Replace the $search value with the $replace value in the $haystack
	$haystack =~ s/$search/$replace/gi;

	return ($haystack);
}
