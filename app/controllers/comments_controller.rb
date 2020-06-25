class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @comment =Comment.create(comment_params)
    redirect_to "/items/#{@comment.item.id}"

    # if @comment.save
    #   flash[:success] = "コメントしました"
    #   redirect_back(fallback_location: root_path)
    # else
    #   flash[:success] = "コメントできませんでした"
    #   redirect_back(fallback_location: root_path)
    # end
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(user_id: current_user.id, item_id: params[:item_id])
  end
end