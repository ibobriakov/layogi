Template.posts_list.helpers({
  arrayify: function (obj) {
    result = [];
    for (var key in obj) result.push({
      day:moment(parseInt(key)).format('DD'),
      date:moment(parseInt(key)).format('MMMM DD, YYYY'),
      posts:obj[key]
    });
    return result;
  },
  dates: function () {
    if(this.postsList){ // XXX
      this.postsList.rewind();    
      var posts = this.postsList.map(function (post, index, cursor) {
        post.rank = index;
        return post;
      });
      var dates = {}
      for (var i = 0; i < posts.length; i++) {
        var time = new Date(posts[i].createdAt).setHours(0,0,0,0);
        if (dates[time]) {
          dates[time].push(posts[i])
        } else {
          dates[time] = [posts[i]]
        }
      };
      return dates;
    }
  },
  hasMorePosts: function(){
    // as long as we ask for N posts and all N posts showed up, then keep showing the "load more" button
    return parseInt(Session.get('postsLimit')) == this.postsCount
  },
  loadMoreUrl: function () {
    var count = parseInt(Session.get('postsLimit')) + parseInt(getSetting('postsPerPage', 10));
    var categorySegment = Session.get('categorySlug') ? Session.get('categorySlug') + '/' : '';
    return '/' + Session.get('view') + '/' + categorySegment + count;
  }
});

Template.posts_list.rendered = function(){
  var distanceFromTop = 0;
  $('.post').each(function(){
    distanceFromTop += $(this).height();
  });
  Session.set('distanceFromTop', distanceFromTop);
  $('body').css('min-height',distanceFromTop+160);
}

