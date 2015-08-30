class Api::HighscoresController < ApplicationController
  def index
    render json: Highscore.limit(10)
  end

  def create
    highscore = Highscore.create(highscore_params)
    if highscore.save
      render json: highscore
    else
      render json: highscore.errors.full_messages, status: 422
    end
  end

  private

  def highscore_params
    params.require(:highscore).permit(:name, :score)
  end
end
