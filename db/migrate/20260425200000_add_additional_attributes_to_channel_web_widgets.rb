class AddAdditionalAttributesToChannelWebWidgets < ActiveRecord::Migration[7.1]
  def change
    add_column :channel_web_widgets, :additional_attributes, :jsonb, default: {}, null: false
  end
end
