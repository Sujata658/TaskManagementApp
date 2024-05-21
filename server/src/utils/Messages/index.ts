export const messages = {
  user: {
    creation_success: 'User Created Successfully',
    all_get_success: 'Users Fetched Successfully',
    one_get_success: 'User Fetched Successfully',
    not_found: 'User With Given Id Not Found',
    email_exist: "Email Already Exist",
    edit_success: 'User Edited Successfully',
    delete_success: 'User Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit User',
    delete_forbidden: 'Forbidden To Delete User',
    my_posts_found: "Found all my posts",
    update_success: "User Updated Successfully",
    validation: {
      missing_data: 'Please provide email, name or password in message body',
    },
  },
  post: {
    creation_success: 'Post Created Successfully',
    all_get_success: 'Posts Fetched Successfully',
    one_get_success: 'Post Fetched Successfully',
    not_found: 'Post With Given Id Not Found',
    edit_success: 'Post Edited Successfully',
    delete_success: 'Post Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit Post',
    delete_forbidden: 'Forbidden To Delete Post',
    validation: {
      missing_author: 'Please provide author in message body',
      missing_data: "Either content or title is empty"
    },
  },
  comment: {
    creation_success: 'Comment Created Successfully',
    all_get_success: 'Comments Fetched Successfully',
    one_get_success: 'Comment Fetched Successfully',
    not_found: 'Comment With Given Id Not Found',
    edit_success: 'Comment Edited Successfully',
    delete_success: 'Comment Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit Comment',
    delete_forbidden: 'Forbidden To Delete Comment',
    validation: {
      missing_data: 'Data missing',
    },
  },
  auth: {
    login_success: 'LoggedIn Successfully',
    invalid_account: 'Invalid Password or Email',
    invalid_token: 'Invalid Token',
    refresh_token_expired: 'Refresh Token Expired', 
    not_authorized: 'Not Authorized',
    refresh_success: 'Token Refreshed Successfully',
  },
  error: {
    internal_server_error: 'Internal Server Error',
  },
  validation:{
    invalid_id: "Id is Invalid",
    id_missing: "Id is not valid mongo ObjectID",
    param_missing: "Missing parameter",
    invalid_email: "Email is Invalid",
    invalid_password: "Password is invalid"
  }
};
