class SessionsController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: 'form', layout: false, locals: {user: @user}
    end
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user and @user.authenticate params[:password]
      session[:user_id] = @user.id
      if request.xhr?
        render json: {userNav: render_to_string("_nav", layout: false, user: @user)}
      else
        redirect_to :root
      end
    else
      @errors = ["Email, password, or both are incorrect"]
      if request.xhr?
        render json: {errors: @errors}
      else
        render partial: "form", layout: false, locals: {user: @user}
      end
    end
  end
end