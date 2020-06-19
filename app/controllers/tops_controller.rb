class TopsController < ApplicationController
  before_action :set_notice
  before_action :set_item_search_query
  before_action :set_categories,  only: [:index]
  
  def index  
    @items = Item.including.limit(5).desc.trading_not
  end
  
  def new
  end

  private
  def set_notice
    if current_user.present?
      @notifications = current_user.passive_notifications.preload(:item, sender: :account)
      @notifications.where(checked: false).each do |notification|
        notification.update_attributes(checked: true)
      end
    end
  end
end