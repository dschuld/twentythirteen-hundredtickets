<?php
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}

function enqueue_scripts() {
	wp_enqueue_script('flexible-header', get_stylesheet_directory_uri() . '/js/flexible-header.js', array( 'jquery' ));
	wp_enqueue_script('s11script', get_stylesheet_directory_uri() . '/js/all.js', array( 'jquery', 'googlemapsapi' ), 1.0, true);
	wp_enqueue_script('s11-ajax', get_stylesheet_directory_uri() . '/js/s11-ajax.js', array( 'jquery' ), '1.0', true );
	
	
	wp_localize_script( 's11script', 'wpdata', array(
	'wpBaseUrl' => get_site_url(),
	'restApiPath' => '/wp-json/wp/v2/posts/',
	'tripOptionsUrl' => get_stylesheet_directory_uri() . '/js/tripOptions.json'
		));
	
	// localize_script creates a var def at beginning of JS: here we can use ajaxs11 object that 
	//gives the url of the admin-ajax.php file 
	wp_localize_script( 's11-ajax', 'ajaxs11', array(
	'ajaxurl' => admin_url( 'admin-ajax.php' ),
	'query_vars' => json_encode( $wp_query->query )
		));
}


function init_deps() {
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
	wp_register_script( 'googlemapsapi', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_tzVeeSDTTQYAIstEIknMEoJ1l3IlUFE&libraries=geometry');
}

function get_id_by_slug($page_slug) {
$args=array(
  'name' => $page_slug,
  'post_type' => 'post',
  'post_status' => 'publish',
  'showposts' => 1,
  'caller_get_posts'=> 1
);
$my_post = get_posts($args);
if( $my_post ) {
	return $my_post[0]->ID;
}
}

function ajax_load_post() {

	ajax_load(new WP_Query( array( 'name' => $_GET['post_slug']  ) ), 'post' );

    die();
	
}

function ajax_load_home() {

	$posts = new WP_Query( array( 'author' => -12 ) );
	ajax_load($posts);
	print_pagination(1, $posts->found_posts);

    die();
}

function ajax_load($posts, $post_format = null) {
	
	if( ! $posts->have_posts() ) { 
        get_template_part( 'content', 'none' );
    }
    else {
        while ( $posts->have_posts() ) { 
            $posts->the_post();
			if ($post_format == null) {
				$post_format = get_post_format();
			}
            get_template_part( 'content', $post_format);
			
        }
    }
	
}

function ajax_pagination() { 

	$query_vars = json_decode( stripslashes( $_GET['query_vars'] ), true );

    $query_vars['paged'] = $_GET['page'];
	
	
    $posts = new WP_Query( $query_vars );
    $GLOBALS['wp_query'] = $posts;
	
	ajax_load($posts);
	
	print_pagination($_GET['page'], $posts->found_posts);
	
	die();
}

function print_pagination($currentPage, $numPostsTotal) {
	

		?>
	<nav class="navigation paging-navigation" role="navigation">
		<h1 class="screen-reader-text"><?php _e( 'Posts navigation', 'twentythirteen' ); ?></h1>
		<div class="nav-links">
		
			<?php if ( $currentPage * 10 <  $numPostsTotal) : ?>
			<div class="nav-previous"><a href="<?php echo get_site_url() ?> /page/<?php echo $currentPage + 1?> "><span class="meta-nav">←</span> Older Posts</a></div>
			<?php endif; ?>

			<?php if ( $currentPage != 1 ) : ?>
			<div class="nav-next"><a href="<?php echo get_site_url() ?> /page/<?php echo $currentPage - 1?> "><span class="meta-nav">→</span> Newer Posts</a></div>
			<?php endif; ?>
			

		</div><!-- .nav-links -->
	</nav><!-- .navigation -->
	<?php
}

add_action('init', 'init_deps');



add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );


add_action( 'wp_ajax_nopriv_ajaxLoadPost', 'ajax_load_post' );
add_action( 'wp_ajax_ajaxLoadPost', 'ajax_load_post' );

add_action( 'wp_ajax_nopriv_ajaxLoadHome', 'ajax_load_home' );
add_action( 'wp_ajax_ajaxLoadHome', 'ajax_load_home' );

add_action( 'wp_ajax_nopriv_ajaxPagination', 'ajax_pagination' );
add_action( 'wp_ajax_ajaxPagination', 'ajax_pagination' );


